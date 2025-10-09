"use client";

type Props = {
  questionId: string;
};

export default function AnswerForm({ questionId }: Props) {
  return (
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
  );
}