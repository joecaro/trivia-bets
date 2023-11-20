import equal from "fast-deep-equal";
import { useState } from "react";
import { useSocket } from "../context/socketContext";
import { ICON_MAP } from "../lib/types";
import useGameStore from "../zustand/gameStore";

type PlayerProps = {
    name: string,
    id: string,
    icon: keyof typeof ICON_MAP,
    score: number,
}

export default function Player({
    name,
    id,
    icon,
    score,
}: PlayerProps) {
    const [inputName, setInputName] = useState(name);
    const [editing, setEditing] = useState(false);

    const stage = useGameStore(state => state.stage)
    const currentAnswers = useGameStore(state => state.currentAnswers, (a, b) => equal(a, b))

    const { updateUser, socket } = useSocket()

    const isFaded = stage === 'question' && !currentAnswers?.answers?.[id]

    const handleBlur = () => {
        setEditing(false)
        updateUser('name', inputName)
    }

    return (
        <div className={`flex gap-5 items-center bg-slate-300 border border-slate-500 rounded px-1 py-1 ${isFaded ? 'opacity-50' : ''}`}>
            <div className="flex gap-1 items-center">
                <div className="w-8 h-8 rounded bg-slate-100 flex justify-center items-center">
                    {
                        id === socket.id ? (
                            <select value={icon} onChange={(e) => updateUser('icon', e.currentTarget.value)} className="bg-transparent">
                                <option value="smiley">{ICON_MAP.smiley}</option>
                                <option value="frown">{ICON_MAP.frown}</option>
                                <option value="neutral">{ICON_MAP.neutral}</option>
                                <option value="question">{ICON_MAP.question}</option>
                            </select>
                        ) : (
                            <span>{ICON_MAP[icon]}</span>
                        )
                    }
                </div>
                <input onFocus={() => setEditing(true)} onBlur={handleBlur} onChange={e => setInputName(e.currentTarget.value)} value={inputName} className={`w-24 ${editing ? "bg-white" : "bg-transparent"}`}></input>
            </div>
            <div>
                <p className="font-bold p-1">{score}</p>
            </div>
        </div>
    );
}