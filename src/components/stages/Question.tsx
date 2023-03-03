'use client'

import { SyntheticEvent, useState } from "react"
import { useGame } from "../../context/gameContext"
import { useTimer } from "../../context/timerContext"

export default function Question() {
    const [answer, setAnswer] = useState('')
    const { gameState, questions, submitAnswer, users } = useGame()
    const { timer } = useTimer()

    const handleAnswerChange = (e: SyntheticEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleSubmit = () => {
        setAnswer('')
        submitAnswer(answer)
    }
    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            <p className="text-slate-500 font-bold">
                question {gameState?.currentQuestionIndex || 0} of 10
            </p>
            <p className="max-w-lg text-center text-lg font-bold text-slate-700">
                {questions[gameState?.currentQuestionIndex || 0].question}
            </p>
            <div className="py-1 px-2 rounded bg-slate-500 text-slate-50">
               {timer ? `⏲ ${timer}s left` : '...'}
            </div>
            <div className="flex gap-2">
                <input className="p-2 border-slate-400 border rounded" type='number' value={answer} onChange={handleAnswerChange} />
                <button
                    className="py-2 px-4 bg-blue-500 text-slate-50 border rounded shadow-sm"
                    onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}