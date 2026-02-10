import AnswerForm from "@/components/AnswerForm";
import AnswerItem from "@/components/AnswerItem";
import { fetchQuestion, fetchAnswers } from "@/lib/data";

export default async function QuestionPage(props: any) {
  const questionId = props?.params?.id as string;
  
  // Fetch actual question and answers data
  const [question, answers] = await Promise.all([
    fetchQuestion(questionId),
    fetchAnswers(questionId),
  ]);

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900">Question not found</h1>
      </div>
    );
  }

  // Sort answers - accepted answers first
  const sortedAnswers = [...answers].sort((a, b) => {
    // Accepted answers come first
    if (a.is_accepted && !b.is_accepted) return -1;
    if (!a.is_accepted && b.is_accepted) return 1;
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Question Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {question.title}
        </h1>
        <div className="h-px bg-gray-200"></div>
      </div>

      {/* Answer Form */}
      <AnswerForm questionId={questionId} />

      {/* Answers List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>
        
        {sortedAnswers.map((answer) => (
          <AnswerItem
            key={answer.id}
            id={answer.id}
            text={answer.answer}
            isAccepted={answer.is_accepted || false}
            questionId={questionId}
          />
        ))}
        
        {answers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No answers yet. Be the first to answer!</p>
          </div>
        )}
      </div>
    </div>
  );
}