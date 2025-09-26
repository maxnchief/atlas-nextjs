interface TopicPageProps {
  params: {
    id: string;
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const { id } = params;
  
  // Mock data - in a real app, you'd fetch this based on the ID
  const topicData: Record<string, { name: string; description: string }> = {
    "1": { name: "Technology", description: "Discussions about the latest in tech, programming, and innovation" },
    "2": { name: "Science", description: "Scientific discoveries, research, and academic discussions" },
    "3": { name: "Arts", description: "Creative expressions, literature, music, and visual arts" },
    "4": { name: "Philosophy", description: "Deep thoughts, ethical discussions, and philosophical inquiries" },
  };

  const topic = topicData[id] || { 
    name: `Topic ${id}`, 
    description: "A place for meaningful discussions" 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/ui" className="text-blue-600 hover:text-blue-700">
                ← Back to Dashboard
              </a>
              <h1 className="text-2xl font-bold text-gray-900">{topic.name}</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Ask Question
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p className="text-lg text-gray-600">{topic.description}</p>
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
                {/* Mock Questions */}
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        What are the latest trends in web development?
                      </h3>
                      <p className="text-gray-600 mb-3">
                        I'm looking to understand the current landscape of web development 
                        technologies and frameworks that are gaining popularity...
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Asked 2 hours ago</span>
                        <span>•</span>
                        <span>3 answers</span>
                        <span>•</span>
                        <span>45 views</span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-center space-y-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        ▲
                      </button>
                      <span className="text-sm font-medium">12</span>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        ▼
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        How to optimize database performance?
                      </h3>
                      <p className="text-gray-600 mb-3">
                        My application is experiencing slow database queries. What are some 
                        best practices for optimizing database performance...
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Asked 5 hours ago</span>
                        <span>•</span>
                        <span>7 answers</span>
                        <span>•</span>
                        <span>89 views</span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-center space-y-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        ▲
                      </button>
                      <span className="text-sm font-medium">8</span>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        ▼
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Best practices for API design?
                      </h3>
                      <p className="text-gray-600 mb-3">
                        I'm designing a REST API for my application and want to follow 
                        industry best practices. What should I consider...
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Asked 1 day ago</span>
                        <span>•</span>
                        <span>12 answers</span>
                        <span>•</span>
                        <span>156 views</span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-center space-y-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        ▲
                      </button>
                      <span className="text-sm font-medium">23</span>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
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
                  <span className="font-medium">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Today</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contributors</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-medium">2.3h</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related Topics
              </h3>
              <div className="space-y-2">
                <a
                  href="/ui/topics/2"
                  className="block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Science
                </a>
                <a
                  href="/ui/topics/3"
                  className="block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Arts
                </a>
                <a
                  href="/ui/topics/4"
                  className="block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Philosophy
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}