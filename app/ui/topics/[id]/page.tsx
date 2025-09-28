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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <a href="/ui" className="text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </a>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic.title}</h1>
        <p className="text-lg text-gray-600">Discussions about {topic.title}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Questions
                  </h2>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Unanswered</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {questions.length > 0 ? (
                  questions.map((question) => (
                    <div key={question.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {question.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Asked recently</span>
                            <span>•</span>
                            <span>0 answers</span>
                            <span>•</span>
                            <span>0 views</span>
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col items-center space-y-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            ▲
                          </button>
                          <span className="text-sm font-medium">{question.votes}</span>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            ▼
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>No questions found for this topic yet.</p>
                    <p className="mt-2">Be the first to ask a question!</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 text-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Load More Questions
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Topic Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Today</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Votes</span>
                  <span className="font-medium">{questions.reduce((sum, q) => sum + q.votes, 0)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left text-blue-600 hover:text-blue-700 hover:underline px-3 py-2 rounded hover:bg-blue-50 transition-colors">
                  Ask Question
                </button>
                <a
                  href="/ui"
                  className="block text-blue-600 hover:text-blue-700 hover:underline px-3 py-2 rounded hover:bg-blue-50 transition-colors"
                >
                  Browse All Topics
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}