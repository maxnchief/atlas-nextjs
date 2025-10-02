import { db } from "@vercel/postgres";
import { users, topics, questions } from "../../lib/placeholder-data";
import { revalidatePath } from "next/cache";

// Simple hash function for Edge Runtime compatibility
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

async function seedUsers(client: any) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  await client.sql`DELETE FROM users`;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = simpleHash(user.password);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedTopics(client: any) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS topics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );
  `;

  await client.sql`DELETE FROM topics`;

  const insertedTopics = await Promise.all(
    topics.map(
      (topic) => client.sql`
        INSERT INTO topics (id, title)
        VALUES (${topic.id}, ${topic.title})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedTopics;
}

async function seedQuestions(client: any) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS questions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      question TEXT NOT NULL,
      topic_id UUID NOT NULL,
      votes INT DEFAULT 0
    );
  `;

  await client.sql`DELETE FROM questions`;

  const insertedQuestions = await Promise.all(
    questions.map(
      (question) => client.sql`
        INSERT INTO questions (id, question, topic_id, votes)
        VALUES (${question.id}, ${question.title}, ${question.topic}, ${question.votes})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedQuestions;
}

async function seedAnswers(client: any) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS answers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      question_id UUID NOT NULL,
      answer TEXT NOT NULL,
      is_correct BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );
  `;

  await client.sql`DELETE FROM answers`;

  const answers = [
    { id: "410544b2-4001-4271-9855-fec4b6a6442a", question_id: "410544b2-4001-4271-9855-fec4b6a6442c", answer: "Yes, variables declared with let can be reassigned.", is_correct: true },
    { id: "410544b2-4001-4271-9855-fec4b6a6442b", question_id: "410544b2-4001-4271-9855-fec4b6a6442c", answer: "No, let variables are constants.", is_correct: false },
  ];

  const insertedAnswers = await Promise.all(
    answers.map(
      (answer) => client.sql`
        INSERT INTO answers (id, question_id, answer, is_correct)
        VALUES (${answer.id}, ${answer.question_id}, ${answer.answer}, ${answer.is_correct})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedAnswers;
}

async function clearDatabase(client: any) {
  await client.sql`DROP TABLE IF EXISTS answers`;
  await client.sql`DROP TABLE IF EXISTS questions`;
  await client.sql`DROP TABLE IF EXISTS topics`;
  await client.sql`DROP TABLE IF EXISTS users`;
}

export async function GET() {
  try {
    // Check if database connection is available
    if (!process.env.POSTGRES_URL) {
      return Response.json({ 
        message: "Database seeding skipped - no database connection string provided. App will use fallback data." 
      });
    }

    const client = await db.connect();
    
    await client.sql`BEGIN`;
    await clearDatabase(client);
    await seedUsers(client);
    await seedTopics(client);
    await seedQuestions(client);
    await seedAnswers(client);
    await client.sql`COMMIT`;

    revalidatePath("/");
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error);
    return Response.json({ 
      message: "Database seeding failed - app will use fallback data",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
