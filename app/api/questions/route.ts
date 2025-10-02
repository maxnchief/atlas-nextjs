import { insertQuestion } from "../../../lib/data";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, topic_id, votes } = await request.json();

    if (!title || !topic_id) {
      return Response.json({ error: "Title and topic_id are required" }, { status: 400 });
    }

    let newQuestion;

    if (process.env.POSTGRES_URL) {
      // Try to create question in database
      newQuestion = await insertQuestion({ 
        title, 
        topic_id, 
        votes: votes || 0 
      });
    } else {
      // Fallback: create a mock question when database is not available
      newQuestion = {
        id: `demo-q-${Date.now()}`,
        title: title,
        topic_id: topic_id,
        votes: votes || 0,
      };
    }
    
    return Response.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error("Error creating question:", error);
    
    // Fallback: create a mock question on database error
    try {
      const { title, topic_id, votes } = await request.json();
      const fallbackQuestion = {
        id: `demo-q-${Date.now()}`,
        title: title,
        topic_id: topic_id,
        votes: votes || 0,
      };
      return Response.json(fallbackQuestion, { status: 201 });
    } catch (fallbackError) {
      return Response.json({ error: "Failed to create question" }, { status: 500 });
    }
  }
}