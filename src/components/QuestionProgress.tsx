type QuestionProgressProps = {
    currentQuestion: number,
    totalQuestions: number,
}

export default function QuestionProgress({
    currentQuestion,
    totalQuestions,
}: QuestionProgressProps) {
    return (
        <div className="flex justify-center items-center">
            <div className="flex gap-1">
                {Array.from({ length: totalQuestions }, (_, i) => (
                    <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 border-slate-200 flex justify-center items-center ${i <= currentQuestion
                                ? "bg-blue-500"
                                : "bg-slate-500"
                            }`}
                    >
                        {i + 1}
                    </div>

                ))}
            </div>
        </div>
    );
}