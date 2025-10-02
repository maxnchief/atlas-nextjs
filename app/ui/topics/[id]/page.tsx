import TopicPageClient from "./topic-page-client";
import { fetchTopic, fetchQuestions } from "../../../../lib/data";
import { notFound } from "next/navigation";

interface TopicPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { id } = await params;
  
  let topic = null;
  let questions = [];

  try {
    if (process.env.POSTGRES_URL) {
      // Try database fetch
      [topic, questions] = await Promise.all([
        fetchTopic(id),
        fetchQuestions(id)
      ]);
    } else {
      // Fallback demo data
      const demoTopics: { [key: string]: any } = {
        "1": { id: "1", title: "React" },
        "2": { id: "2", title: "Tailwind" },
        "3": { id: "3", title: "TypeScript" },
      };
      
      topic = demoTopics[id] || null;
      questions = [
        { id: "demo-1", title: "What is " + (topic?.title || "this topic") + "?", votes: 5, topic_id: id },
        { id: "demo-2", title: "How to get started with " + (topic?.title || "this topic") + "?", votes: 3, topic_id: id },
      ];
    }
  } catch (error) {
    console.error("Error fetching topic data:", error);
    // Fallback demo data on error
    const demoTopics: { [key: string]: any } = {
      "1": { id: "1", title: "React" },
      "2": { id: "2", title: "Tailwind" },
      "3": { id: "3", title: "TypeScript" },
    };
    
    topic = demoTopics[id] || null;
    questions = [
      { id: "demo-1", title: "What is " + (topic?.title || "this topic") + "?", votes: 5, topic_id: id },
      { id: "demo-2", title: "How to get started with " + (topic?.title || "this topic") + "?", votes: 3, topic_id: id },
    ];
  }

  if (!topic) {
    notFound();
  }

  return <TopicPageClient topic={topic} initialQuestions={questions} />;
}