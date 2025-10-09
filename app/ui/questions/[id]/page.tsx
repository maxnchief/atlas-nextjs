import AnswerForm from "@/components/AnswerForm";
import AnswerItem from "@/components/AnswerItem";
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
      <AnswerForm questionId={questionId} />

      {/* Answers List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {mockAnswers.length} Answer{mockAnswers.length !== 1 ? 's' : ''}
        </h2>
        
        {sortedAnswers.map((answer) => (
          <AnswerItem
            key={answer.id}
            id={answer.id}
            text={answer.text}
            isAccepted={answer.is_accepted}
            questionId={questionId}
          />
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