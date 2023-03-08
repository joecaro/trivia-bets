import equal from "fast-deep-equal";
import useGameStore from "../zustand/gameStore";

type PlayerProps = {
    name: string,
    id: string,
    image: string,
    score: number,
}

export default function Player({
    name,
    id,
    image,
    score,
}: PlayerProps) {
    const stage = useGameStore(state => state.stage)
    const currentAnswers = useGameStore(state => state.currentAnswers, (a, b) => equal(a, b))

    const isFaded = stage === 'question' && !currentAnswers?.answers?.[id]

    return (
        <div className={`flex gap-5 items-center bg-slate-300 border border-slate-500 rounded px-1 py-1 ${isFaded ? 'opacity-50' : ''}`}>
            <div className="flex gap-1 items-center">
                <div className="w-8 h-8 rounded bg-slate-100 flex justify-center items-center">
                    <p className="text-slate-600 text-lg">:)</p>
                </div>
                <p>{name}</p>
            </div>
            <div>
                <p className="font-bold p-1">{score}</p>
            </div>
        </div>
    );
}