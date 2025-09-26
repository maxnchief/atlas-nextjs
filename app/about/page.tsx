export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-gray-900">
              Atlas
            </a>
            <a
              href="/ui"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">
              Atlas is a knowledge sharing platform designed to connect people through 
              meaningful discussions and collaborative learning.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              We believe that knowledge grows when shared. Our platform provides a space 
              where curious minds can ask questions, share insights, and build understanding 
              together across diverse topics and disciplines.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Topic-based discussions organized for easy navigation</li>
              <li>Community-driven question and answer system</li>
              <li>Expert insights and collaborative knowledge building</li>
              <li>User-friendly interface for seamless interaction</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-gray-700 mb-8">
              Whether you're here to learn, teach, or simply explore new ideas, 
              Atlas welcomes you to be part of our growing community of knowledge seekers.
            </p>
            
            <div className="text-center">
              <a
                href="/ui"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Exploring
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}