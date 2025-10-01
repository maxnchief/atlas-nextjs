export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Atlas</h1>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Atlas
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your knowledge sharing platform
          </p>
          <div className="space-x-4">
            <a
              href="/about"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Learn More
            </a>
            <a
              href="/login"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Log In
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
