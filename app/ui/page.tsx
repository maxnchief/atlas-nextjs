import { fetchTopics } from "@/lib/data";
import { Topic } from "@/components/Topic";

export default async function Page() {
  const topics = await fetchTopics();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Topics</h1>
      <div className="space-y-4">
        {topics.map((topic) => (
          <Topic key={topic.id} id={topic.id} text={topic.title} />
        ))}
      </div>
      {topics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No topics yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}