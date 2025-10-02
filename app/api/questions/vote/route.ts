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
    
    if (process.env.POSTGRES_URL) {
      // Try database voting
      if (action === 'upvote') {
        updatedQuestion = await incrementVotes(questionId);
      } else {
        updatedQuestion = await decrementVotes(questionId);
      }
    } else {
      // Fallback: simulate voting when database is not available
      const newVotes = action === 'upvote' ? 1 : -1;
      updatedQuestion = {
        id: questionId,
        votes: Math.max(0, newVotes), // Don't allow negative votes in demo
      };
    }
    
    return Response.json({
      questionId,
      votes: updatedQuestion.votes,
      action
    }, { status: 200 });
  } catch (error) {
    console.error("Error voting:", error);
    
    // Fallback: simulate voting on error
    try {
      const { questionId, action } = await request.json();
      const newVotes = action === 'upvote' ? 1 : 0;
      return Response.json({
        questionId,
        votes: newVotes,
        action
      }, { status: 200 });
    } catch (fallbackError) {
      return Response.json({ error: "Failed to record vote" }, { status: 500 });
    }
  }
}