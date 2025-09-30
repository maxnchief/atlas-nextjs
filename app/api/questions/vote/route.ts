import { incrementVotes, decrementVotes } from "../../../../lib/data";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { questionId, action } = await request.json();

    if (!questionId || !action) {
      return Response.json({ error: "questionId and action are required" }, { status: 400 });
    }

    if (action !== 'upvote' && action !== 'downvote') {
      return Response.json({ error: "action must be 'upvote' or 'downvote'" }, { status: 400 });
    }

    let updatedQuestion;
    if (action === 'upvote') {
      updatedQuestion = await incrementVotes(questionId);
    } else {
      updatedQuestion = await decrementVotes(questionId);
    }
    
    return Response.json({
      questionId,
      votes: updatedQuestion.votes,
      action
    }, { status: 200 });
  } catch (error) {
    console.error("Error voting:", error);
    return Response.json({ error: "Failed to record vote" }, { status: 500 });
  }
}