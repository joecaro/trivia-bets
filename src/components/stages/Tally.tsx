'use client'

import equal from "fast-deep-equal";
import { useEffect } from "react";
import { useSocket } from "../../context/socketContext"
import { Bet } from "../../lib/types";
import useGameStore from "../../zustand/gameStore";
import BetResult from "../BetResult";

function formatBets(userBets: [Bet, Bet], closestAnswer: string) {
    const bet1 = {
        answer: userBets[0].answer,
        bet: userBets[0].chips,
        odds: userBets[0].payout,
        payout: userBets[0].answer === closestAnswer ? userBets[0].payout * (userBets[0].chips + 1) : 0,
    }

    const bet2 = {
        answer: userBets[1].answer,
        bet: userBets[1].chips,
        odds: userBets[0].payout,
        payout: userBets[1].answer === closestAnswer ? userBets[0].payout * (userBets[1].chips + 1) : 0,
    }

    return [bet1, bet2]

}

export default function Tally() {
    const bets = useGameStore(state => state.currentBets, (a, b) => equal(a, b))
    const answers = useGameStore(state => state.currentAnswers, (a, b) => equal(a, b))
    const questions = useGameStore(state => state.questions, (a, b) => equal(a, b))
    const currentQuestionIndex = useGameStore(state => state.currentQuestionIndex)
    const users = useGameStore(state => state.users, (a, b) => equal(a, b))
    const isSpectating = useGameStore(state => state.isSpectating)

    const { socket } = useSocket();

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.getElementById('player-tally')?.classList.add('zoom-out')
        }, 5000);

        return () => clearTimeout(timeout)
    }, [])

    if (!bets || !answers) return (<div></div>)
    const closestAnswer = answers?.closestAnswer.answer || 'none'
    const userBets = bets?.[socket.id] || []

    const [bet1, bet2] = formatBets(userBets, closestAnswer)

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-2xl font-bold">Tally</h1>
            <p>{questions[currentQuestionIndex || 0].question}</p>
            <p>Correct Answer: <span className="font-bold text-xl">{questions[currentQuestionIndex || 0].answer}</span></p>

            <div>
                <div id='player-tally' className="w-full max-w-3xl grid grid-cols-3 gap-1 my-4 zoom">
                    {!isSpectating && (
                        <>
                            <div>
                                <p className="text-2xl font-bold">You</p>
                            </div>
                            <BetResult className="pop-in" verbose={true} answer={closestAnswer} bet={bet1} />
                            <BetResult className="pop-in" verbose={true} answer={closestAnswer} bet={bet2} />
                        </>
                    )}
                </div>
                {bets && answers ?
                    users.filter(u => u.id !== socket.id).map((user, i) => {
                        const closestAnswer = answers?.closestAnswer.answer || 'none'
                        const userBets = bets?.[user.id] || []

                        
                        const [bet1, bet2] = formatBets(userBets, closestAnswer)

                        return (
                            <div key={user.id} className="w-full max-w-3xl grid grid-cols-3 gap-1 my-4">
                                <div className="">
                                    <p>{user.name}</p>
                                </div>
                                <BetResult className="justify-center" verbose={false} answer={closestAnswer} bet={bet1} />
                                <BetResult className="justify-center" verbose={false} answer={closestAnswer} bet={bet2} />
                            </div>
                        )
                    })
                    : null
                }
            </div>
        </div>
    )
}