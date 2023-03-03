'use client'

import { useEffect, useState } from "react";
import { useGame } from "../../context/gameContext"
import { useTimer } from "../../context/timerContext";
import AnswerSpot from "../AnswerSpot";

export default function Bets() {
    const { gameState, bet, questions } = useGame()
    const { timer } = useTimer()

    const answers = Object.entries(gameState?.currentAnswers?.answers || {})

    answers.sort((a, b) => parseInt(a[1].answer) - parseInt(b[1].answer))

    const even = answers.length % 2 === 0;

    const middle = even ? answers.length / 2 : (answers.length - 1) / 2;

    const payout = (index: number) => even
        ? index < middle ? middle - index + 1 : index - middle + 2
        : Math.abs(middle - index) + 2

    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            <p className="max-w-lg text-center text-lg font-bold text-slate-700 mb-4">
                {questions[gameState?.currentQuestionIndex || 0].question}
            </p>
            <div className="py-1 px-2 rounded bg-slate-500 text-slate-50">
                {timer ? `⏲ ${timer}s left` : '...'}
            </div>
            <div className="flex justify-center gap-5">
                <AnswerSpot key={'none'} label='Smaller than any answer' answer={'none'} onDrop={(betIdx) => bet('none', 5, betIdx)} odds={`5-1`} />
                {even ?
                    <>
                        {answers.slice(0, middle).map(([userId, answer], i) => (
                            <AnswerSpot key={answer.answer} answer={answer.answer} onDrop={(betIdx) => bet(answer.answer, payout(i), betIdx)} odds={`${(payout(i)).toString()}-1`} />
                        ))}
                        <AnswerSpot onDrop={(betIdx) => { }} odds={`2-1`} />
                        {answers.slice(middle).map(([userId, answer], i) => (
                            <AnswerSpot key={answer.answer} answer={answer.answer} onDrop={(betIdx) => bet(answer.answer, payout(middle + i), betIdx)} odds={`${(payout(middle + i)).toString()}-1`} />
                        ))}
                    </>
                    : answers.map(([userId, answer], i) => (
                        <AnswerSpot key={answer.answer} answer={answer.answer} onDrop={(betIdx) => bet(answer.answer, payout(i), betIdx)} odds={`${(payout(i)).toString()}-1`} />
                    ))}
                <AnswerSpot key={'empty'} onDrop={(betIdx) => { }} odds={`0-1`} />
            </div>
        </div>
    )
}