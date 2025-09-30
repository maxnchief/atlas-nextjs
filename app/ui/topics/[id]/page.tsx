import TopicPageClient from "./topic-page-client";
import { fetchTopic, fetchQuestions } from "../../../../lib/data";
import { notFound } from "next/navigation";

interface TopicPageProps {
  params: {
    id: string;
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { id } = params;
  
  const [topic, questions] = await Promise.all([
    fetchTopic(id),
    fetchQuestions(id)
  ]);

  if (!topic) {
    notFound();
  }

  return <TopicPageClient topic={topic} initialQuestions={questions} />;
}