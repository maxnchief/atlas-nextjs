import { insertTopic } from "../../../lib/data";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const newTopic = await insertTopic({ title });
    
    return Response.json(newTopic, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return Response.json({ error: "Failed to create topic" }, { status: 500 });
  }
}