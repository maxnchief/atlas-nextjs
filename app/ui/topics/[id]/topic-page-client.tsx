"use client";

import { useState } from "react";
import { Topic, Question } from "../../../../lib/definitions";

interface TopicPageClientProps {
  topic: Topic;
  initialQuestions: Question[];
}

export default function TopicPageClient({ topic, initialQuestions }: TopicPageClientProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get('title') as string;

    if (!title.trim()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          topic_id: topic.id,
          votes: 0,
        }),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        setQuestions(prev => [newQuestion, ...prev]);
        form.reset();
      } else {
        alert('Failed to create question');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error creating question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (questionId: string, action: 'upvote' | 'downvote') => {
    try {
      const response = await fetch('/api/questions/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          action,
        }),
      });

      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestions(prev => 
          prev.map(q => 
            q.id === questionId 
              ? { ...q, votes: updatedQuestion.votes }
              : q
          )
        );
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

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
          {/* Ask Question Form */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ask a Question</h3>
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder={`What's your question about ${topic.title}?`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Asking...' : 'Ask Question'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Questions ({questions.length})
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
                        <button 
                          onClick={() => handleVote(question.id, 'upvote')}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          ▲
                        </button>
                        <span className="text-sm font-medium">{question.votes}</span>
                        <button 
                          onClick={() => handleVote(question.id, 'downvote')}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
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

            {questions.length > 5 && (
              <div className="p-6 border-t border-gray-200 text-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Load More Questions
                </button>
              </div>
            )}
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
              <button 
                onClick={() => {
                  const input = document.querySelector('input[name="title"]') as HTMLInputElement;
                  if (input) {
                    input.focus();
                    input.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full text-left text-blue-600 hover:text-blue-700 hover:underline px-3 py-2 rounded hover:bg-blue-50 transition-colors"
              >
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