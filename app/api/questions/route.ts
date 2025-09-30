import { insertQuestion } from "../../../lib/data";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, topic_id, votes } = await request.json();

    if (!title || !topic_id) {
      return Response.json({ error: "Title and topic_id are required" }, { status: 400 });
    }

    const newQuestion = await insertQuestion({ 
      title, 
      topic_id, 
      votes: votes || 0 
    });
    
    return Response.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error("Error creating question:", error);
    return Response.json({ error: "Failed to create question" }, { status: 500 });
  }
}