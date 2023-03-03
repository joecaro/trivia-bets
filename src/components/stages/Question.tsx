'use client'

import { SyntheticEvent, useState } from "react"
import { useSocket } from "../../context/socketContext"
import { useTimer } from "../../context/timerContext"
import useGameStore from "../../zustand/gameStore"

export default function Question() {
    const [answer, setAnswer] = useState('')
    
    const currentQuestionIndex = useGameStore(state => state.currentQuestionIndex)
    const questions = useGameStore(state => state.questions)

    const { submitAnswer } = useSocket()

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
                question {currentQuestionIndex || 0} of 10
            </p>
            <p className="max-w-lg text-center text-lg font-bold text-slate-700">
                {questions[currentQuestionIndex || 0].question}
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