'use client'

import equal from "fast-deep-equal";
import { useMemo } from "react";
import { useSocket } from "../../context/socketContext";
import { useTimer } from "../../context/timerContext";
import useGameStore, { defaultBets, setUserBets } from "../../zustand/gameStore";
import AnswerSpot from "../AnswerSpot";
import Timer from "../Timer";

export default function Bets() {
    const { socket } = useSocket();
    const currentAnswers = useGameStore(state => state.currentAnswers, (a, b) => equal(a, b))
    const currentQuestionIndex = useGameStore(state => state.currentQuestionIndex)
    const currentBets = useGameStore(state => state.currentBets, (a, b) => equal(a, b))
    const questions = useGameStore(state => state.questions)
    const isSpectating = useGameStore(state => state.isSpectating)

    const userBets = useMemo(() => socket.id ? currentBets[socket.id] || defaultBets : defaultBets, [currentBets, socket]);

    const { bet } = useSocket();

    const { timer } = useTimer()

    const answers = Object.entries(currentAnswers?.answers || {})

    answers.sort((a, b) => parseInt(a[1].answer) - parseInt(b[1].answer))

    const even = answers.length % 2 === 0;

    const middle = even ? answers.length / 2 : (answers.length - 1) / 2;

    const payout = (index: number) => even
        ? index < middle ? middle - index + 1 : index - middle + 2
        : Math.abs(middle - index) + 2

    const composeBet = (answer: string, odds: number, ) => {
        return (betIdx: number) => {
            const betDup = [...userBets]
            betDup[betIdx] = { answer, payout: odds, chips: betDup[betIdx].chips }
            setUserBets([betDup[0], betDup[1]])
            bet(answer, odds, betIdx)
        }
    }
    return (
        <div className="flex flex-col gap-8 items-center justify-center">
            <p className="max-w-lg text-center text-lg font-bold text-slate-700 mb-4">
                {questions[currentQuestionIndex || 0].question}
            </p>
            <Timer /> 
            <div className="flex justify-center gap-5">
                <AnswerSpot key={'none'} label='Smaller than any answer' answer={'none'} onDrop={(betIdx) => bet('none', 5, betIdx)} odds={`5-1`} />
                {even ?
                    <>
                        {answers.slice(0, middle).map(([userId, answer], i) => (
                            <AnswerSpot key={answer.answer} answer={answer.answer} onDrop={composeBet(answer.answer, payout(i))} odds={`${(payout(i)).toString()}-1`} />
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