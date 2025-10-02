import { fetchTopics } from "../../lib/data";

export default async function UIHomePage() {
  let topics = [];
  
  try {
    // Try to fetch topics from database
    if (process.env.POSTGRES_URL) {
      topics = await fetchTopics();
    } else {
      // Fallback demo topics when database is not configured
      topics = [
        { id: "1", title: "React" },
        { id: "2", title: "Tailwind" },
        { id: "3", title: "TypeScript" },
      ];
    }
  } catch (error) {
    console.error("Error fetching topics:", error);
    // Fallback demo topics on error
    topics = [
      { id: "1", title: "React" },
      { id: "2", title: "Tailwind" },
      { id: "3", title: "TypeScript" },
    ];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600">
            Explore topics, ask questions, and share your knowledge with the community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-gray-700">
                    New question posted in <strong>Technology</strong>
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-gray-700">
                    Answer accepted in <strong>Science</strong>
                  </p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="text-gray-700">
                    New topic created: <strong>Philosophy</strong>
                  </p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                All Topics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <a
                    key={topic.id}
                    href={`/ui/topics/${topic.id}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">{topic.title}</h4>
                    <p className="text-sm text-gray-600">Click to view questions</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <a
                  href="/ui/topics/new"
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create New Topic
                </a>
                <button className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Ask Question
                </button>
                <button className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Browse All Topics
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Asked</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Answers Given</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Topics Created</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reputation</span>
                  <span className="font-medium text-green-600">245</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}