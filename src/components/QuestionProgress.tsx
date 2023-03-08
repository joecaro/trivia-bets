type QuestionProgressProps = {
    currentQuestion: number,
    totalQuestions: number,
}

export default function QuestionProgress({
    currentQuestion,
    totalQuestions,
}: QuestionProgressProps) {
    return (
        <div className="flex justify-center items-center row-start-2 col-span-2 col-start-2 md:row-start-1">
            <div className="flex gap-1">
                {Array.from({ length: totalQuestions }, (_, i) => (
                    <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 flex justify-center items-center ${i < currentQuestion
                                ? "bg-blue-400 border-blue-500 text-slate-50"
                                : i === currentQuestion 
                                    ? "bg-green-200 border-green-300 text-slate-900"
                                    : "bg-slate-400 border-slate-500"
                            }`}
                    >
                        {i + 1}
                    </div>

                ))}
            </div>
        </div>
    );
}