export default function QuestionText({ question }: { question: string }) {
  return (
    <p className="max-w-lg text-center text-2xl font-bold text-slate-600">
      {question}
    </p>
  );
}
