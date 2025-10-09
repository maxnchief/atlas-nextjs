import { CheckIcon } from "@heroicons/react/24/outline";

type Props = {
  id: string;
  text: string;
  isAccepted: boolean;
  questionId: string;
};

export default function AnswerItem({ id, text, isAccepted, questionId }: Props) {
  return (
    <div
      className={`p-6 rounded-lg border ${
        isAccepted 
          ? 'border-green-200 bg-green-50' 
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isAccepted && (
            <div className="flex items-center mb-3">
              <CheckIcon className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">
                Accepted Answer
              </span>
            </div>
          )}
          <p className="text-gray-900 leading-relaxed">
            {text}
          </p>
        </div>
        
        {!isAccepted && (
          <form className="ml-4">
            <input type="hidden" name="answer_id" value={id} />
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
  );
}