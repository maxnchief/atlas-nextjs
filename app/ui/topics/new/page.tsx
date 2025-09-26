"use client";

import { useState } from "react";

export default function NewTopicPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - in a real app, you'd submit to your API
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Topic created:", formData);
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "general",
      });
      
      alert("Topic created successfully!");
    } catch (error) {
      alert("Error creating topic. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <a href="/ui" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
          ← Back to Dashboard
        </a>
        <h1 className="text-3xl font-bold text-gray-900">Create New Topic</h1>
      </div>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Start a New Discussion Topic
            </h2>
            <p className="text-gray-600">
              Create a space for meaningful conversations and knowledge sharing. 
              Make sure to provide a clear name and description to help others understand 
              what your topic is about.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Topic Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter a descriptive topic name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Choose a clear, concise name that describes what your topic is about.
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Provide a detailed description of your topic..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Explain what kind of discussions and questions this topic will cover.
              </p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="arts">Arts & Culture</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="health">Health & Wellness</option>
                <option value="philosophy">Philosophy</option>
                <option value="other">Other</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Select the category that best fits your topic.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Topic Guidelines
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Choose a name that clearly identifies the subject matter</li>
                <li>• Write a comprehensive description to help users understand the scope</li>
                <li>• Ensure your topic doesn't duplicate existing topics</li>
                <li>• Follow community guidelines and maintain respectful discourse</li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <a
                href="/ui"
                className="text-gray-600 hover:text-gray-700 font-medium"
              >
                Cancel
              </a>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setFormData({ name: "", description: "", category: "general" })}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim() || !formData.description.trim()}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Topic"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        {(formData.name.trim() || formData.description.trim()) && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-xl font-medium text-gray-900 mb-2">
                {formData.name.trim() || "Topic Name"}
              </h4>
              <p className="text-gray-600 mb-3">
                {formData.description.trim() || "Topic description will appear here..."}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}
                </span>
                <span>Created just now</span>
                <span>•</span>
                <span>0 questions</span>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}