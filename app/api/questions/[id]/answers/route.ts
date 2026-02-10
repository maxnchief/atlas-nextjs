import { fetchAnswers } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const answers = await fetchAnswers(id);
    
    // Return only id, answer, and question_id fields as per requirements
    const formattedAnswers = answers.map(({ id, answer, question_id }) => ({
      id,
      answer,
      question_id,
    }));
    
    return NextResponse.json(formattedAnswers);
  } catch (error) {
    console.error("Failed to fetch answers:", error);
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}
