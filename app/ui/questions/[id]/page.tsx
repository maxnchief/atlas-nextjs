import { CheckIcon } from "@heroicons/react/24/outline";

// Mock data for now - this will be replaced with actual data fetching
const mockQuestion = {
  id: "1",
  title: "How do I implement authentication in Next.js?",
  topic_id: "1"
};

const mockAnswers = [
  {
    id: "1",
    text: "You can use NextAuth.js library which provides a complete authentication solution for Next.js applications.",
    is_accepted: true,
    question_id: "1"
  },
  {
    id: "2", 
    text: "Another option is to implement custom authentication using JWT tokens and session management.",
    is_accepted: false,
    question_id: "1"
  },
  {
    id: "3",
    text: "You could also use third-party services like Auth0 or Firebase Authentication.",
    is_accepted: false,
    question_id: "1"
  }
];

export default function QuestionPage({ params }: { params: { id: string } }) {
  const questionId = params.id;
  
  // Sort answers to show accepted answer first
  const sortedAnswers = [...mockAnswers].sort((a, b) => {
    if (a.is_accepted && !b.is_accepted) return -1;
    if (!a.is_accepted && b.is_accepted) return 1;
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Question Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {mockQuestion.title}
        </h1>
        <div className="h-px bg-gray-200"></div>
      </div>

      {/* Answer Form */}
      <div className="mb-8">
        <form className="space-y-4">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer
            </label>
            <textarea
              id="answer"
              name="answer"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your knowledge..."
              required
            />
          </div>
          <input type="hidden" name="question_id" value={questionId} />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Answer
          </button>
        </form>
      </div>

      {/* Answers List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {mockAnswers.length} Answer{mockAnswers.length !== 1 ? 's' : ''}
        </h2>
        
        {sortedAnswers.map((answer) => (
          <div
            key={answer.id}
            className={`p-6 rounded-lg border ${
              answer.is_accepted 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {answer.is_accepted && (
                  <div className="flex items-center mb-3">
                    <CheckIcon className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-700">
                      Accepted Answer
                    </span>
                  </div>
                )}
                <p className="text-gray-900 leading-relaxed">
                  {answer.text}
                </p>
              </div>
              
              {!answer.is_accepted && (
                <form className="ml-4">
                  <input type="hidden" name="answer_id" value={answer.id} />
                  <input type="hidden" name="question_id" value={questionId} />
                  <button
                    type="submit"
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                    title="Mark as accepted answer"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
        
        {mockAnswers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No answers yet. Be the first to answer!</p>
          </div>
        )}
      </div>
    </div>
  );
}