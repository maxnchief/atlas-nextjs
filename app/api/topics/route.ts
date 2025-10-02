import { insertTopic } from "../../../lib/data";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    let newTopic;

    if (process.env.POSTGRES_URL) {
      // Try to create topic in database
      newTopic = await insertTopic({ title });
    } else {
      // Fallback: create a mock topic when database is not available
      newTopic = {
        id: `demo-${Date.now()}`, // Generate a unique demo ID
        title: title,
      };
    }
    
    return Response.json(newTopic, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    
    // Fallback: create a mock topic on database error
    try {
      const { title } = await request.json();
      const fallbackTopic = {
        id: `demo-${Date.now()}`,
        title: title,
      };
      return Response.json(fallbackTopic, { status: 201 });
    } catch (fallbackError) {
      return Response.json({ error: "Failed to create topic" }, { status: 500 });
    }
  }
}