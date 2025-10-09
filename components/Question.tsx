import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import VoteButton from "./VoteButton";

type QuestionProps = {
  id: string;
  text: string;
  votes: number;
};

export function Question({ id, text, votes }: QuestionProps) {
  return (
    <div className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b">
      <div className="mr-2 rounded-xl bg-secondary px-2 text-sm text-white">
        {votes}
      </div>
      <p className="text w-full text-left font-semibold">{text}</p>
      <VoteButton id={id} />
    </div>
  );
}

type Props = {
  id: string;
  title: string;
  topic_id: string;
};

export default function Question({ id, title, topic_id }: Props) {
  return (
    <Link href={`/ui/questions/${id}`}>
      <div className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer transition-colors">
        <QuestionMarkCircleIcon className="w-6" />
        <p className="hidden md:block">{title}</p>
      </div>
    </Link>
  );
}
