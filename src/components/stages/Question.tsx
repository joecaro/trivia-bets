'use client'

import { SyntheticEvent, useState } from "react"
import { useGame } from "../../context/gameContext"

export default function Question() {
    const [answer, setAnswer] = useState('')
    const { gameState, questions, submitAnswer, users } = useGame()

    const handleAnswerChange = (e: SyntheticEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleSubmit = () => {
        setAnswer('')
        submitAnswer(answer)
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-3">
                {users.map(user => (
                    gameState?.currentAnswers?.answers?.[user.id] ? (
                        <p key={`answer-${user.id}`} className="text-xl font-bold text-slate-100">{user.name}</p>
                    ) : (
                        <p key={`answer-${user.id}`} className="text-xl font-bold text-slate-500">{user.name}</p>
                    )
                ))}
            </div>

            <p>
                {questions[gameState?.currentQuestionIndex || 0].question}
            </p>
            <div className="p-5 flex gap-2">
                <input className="p-2 border-slate-200 border rounded bg-slate-700" type='number' value={answer} onChange={handleAnswerChange} />
                <button
                    className="py-2 px-4 border-slate-200 border rounded shadow-sm"
                    onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}