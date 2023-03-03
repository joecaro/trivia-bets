'use client'

import { useEffect } from "react";
import { useGame } from "../../context/gameContext"
import { useSocket } from "../../context/socketContext"
import BetResult from "../BetResult";

export default function Tally() {
    const { gameState, users, questions } = useGame()
    const { socket } = useSocket();
    const bets = gameState?.currentBets
    const answers = gameState?.currentAnswers

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.getElementById('player-tally')?.classList.add('zoom-out')
        }, 5000);

        return () => clearTimeout(timeout)
    }, [])

    if (!gameState || !bets || !answers) return (<div></div>)

    const payout = (answer: string) => {

        if (answer === 'none') return 5;

        const ansArray = Object.values(answers.answers || {});
        const ansIdx = ansArray.findIndex(ans => ans.answer === answer)
        const middle = ansArray.length % 2 === 0 ? ansArray.length / 2 : (ansArray.length - 1) / 2;

        const payoutMult = Math.abs(middle - ansIdx) + 2

        return payoutMult
    }
    const closestAnswer = answers?.closestAnswer.answer || ''
    const userBets = bets?.[socket.id] || []

    const bet1 = {
        answer: userBets[0].answer,
        bet: userBets[0].chips,
        odds: payout(userBets[0]?.answer || ''),
        payout: userBets[0].answer === closestAnswer ? payout(userBets[0].answer || '') * (userBets[0].chips + 1) : 0,
    }

    const bet2 = {
        answer: userBets[1].answer,
        bet: userBets[1].chips,
        odds: payout(userBets[1]?.answer || ''),
        payout: userBets[1].answer === closestAnswer ? payout(userBets[1].answer || '') * (userBets[1].chips + 1) : 0,
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-2xl font-bold">Tally</h1>
            <p>{questions[gameState?.currentQuestionIndex || 0].question}</p>
            <p>Correct Answer: <span className="font-bold text-xl">{questions[gameState?.currentQuestionIndex || 0].answer}</span></p>

            <div>
                <div id='player-tally' className="w-full max-w-3xl grid grid-cols-3 gap-1 my-4 zoom">
                    <div>
                        <p className="text-2xl font-bold">You</p>
                    </div>
                    <BetResult className="pop-in" verbose={true} answer={closestAnswer} bet={bet1} />
                    <BetResult className="pop-in" verbose={true} answer={closestAnswer} bet={bet2} />
                </div>
                {bets && answers ?
                    users.filter(u => u.id !== socket.id).map((user, i) => {
                        const payout = (answer: string) => {

                            if (answer === 'none') return 5;

                            const ansArray = Object.values(answers.answers || {});
                            const ansIdx = ansArray.findIndex(ans => ans.answer === answer)
                            const middle = ansArray.length % 2 === 0 ? ansArray.length / 2 : (ansArray.length - 1) / 2;

                            const payoutMult = Math.abs(middle - ansIdx) + 2

                            return payoutMult
                        }
                        const closestAnswer = answers?.closestAnswer.answer || ''
                        const userBets = bets?.[user.id] || []

                        const bet1 = {
                            answer: userBets[0].answer,
                            bet: userBets[0].chips,
                            odds: payout(userBets[0]?.answer || ''),
                            payout: userBets[0].answer === closestAnswer ? payout(userBets[0].answer || '') * (userBets[0].chips + 1) : 0,
                        }

                        const bet2 = {
                            answer: userBets[1].answer,
                            bet: userBets[1].chips,
                            odds: payout(userBets[1]?.answer || ''),
                            payout: userBets[1].answer === closestAnswer ? payout(userBets[1].answer || '') * (userBets[1].chips + 1) : 0,
                        }


                        return (
                            <div key={user.id} className="w-3/4 max-w-3xl flex justify-around">
                                <div>
                                    <p>{user.name}</p>
                                </div>
                                <BetResult verbose={false} answer={closestAnswer} bet={bet1} />
                                <BetResult verbose={false} answer={closestAnswer} bet={bet2} />
                            </div>
                        )
                    })
                    : null
                }
            </div>
        </div>
    )
}