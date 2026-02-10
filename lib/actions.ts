"use server";

import { revalidatePath } from "next/cache";
import { insertTopic, insertQuestion, incrementVotes, insertAnswer, setAcceptedAnswer } from "./data";
import { redirect } from "next/navigation";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
    revalidatePath("/ui/questions/[id]", "page");
    revalidatePath("/ui", "layout");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function addAnswer(form: FormData) {
  try {
    const answerText = form.get("answer") as string;
    const questionId = form.get("question_id") as string;
    await insertAnswer({ answer: answerText, question_id: questionId });
    revalidatePath(`/ui/questions/${questionId}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function markAnswer(form: FormData) {
  try {
    const answerId = form.get("answer_id") as string;
    const questionId = form.get("question_id") as string;
    await setAcceptedAnswer(questionId, answerId);
    revalidatePath(`/ui/questions/${questionId}`);
    revalidatePath(`/ui/topics/${questionId}`);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to mark answer as accepted.");
  }
}