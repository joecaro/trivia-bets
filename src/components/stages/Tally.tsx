'use client'

import { useGame } from "../../context/gameContext"
import { useSocket } from "../../context/socketContext"
import BetResult from "../BetResult";

export default function Tally() {
    const { gameState, users, questions } = useGame()
    const { socket } = useSocket();
    const bets = gameState?.currentBets
    const answers = gameState?.currentAnswers

    if (!gameState || !bets || !answers) return (<div></div>)

    const payout = (answer: string) => {
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
            <p>{questions[gameState?.currentQuestionIndex || 0].question}</p>
            <p>Correct Answer: {questions[gameState?.currentQuestionIndex || 0].answer}</p>
            <div className="w-3/4 max-w-3xl flex justify-around">
                <BetResult answer={closestAnswer} bet={bet1} />
                <BetResult answer={closestAnswer} bet={bet2} />
            </div>
            {/* <h1 className="text-2xl font-bold">Tally</h1>
            <div>

                <div className="grid grid-cols-3 gap-2">
                    <p className='ml-2'>User: </p>
                    <p className='ml-2'>Payouts: </p>
                    <p className='ml-2'>User total: </p>
                </div>
                {bets && answers ?
                    users.map((user, i) => {
                        const payout = (answer: string) => {
                            const ansArray = Object.values(answers.answers);
                            const ansIdx = ansArray.findIndex(ans => ans.answer === answer)
                            const middle = ansArray.length % 2 === 0 ? ansArray.length / 2 : (ansArray.length - 1) / 2;

                            const payoutMult = Math.abs(middle - ansIdx) + 2

                            return payoutMult
                        }
                        const closestAnswer = answers.closestAnswer.answer
                        const userBets = bets[user.id]

                        const bet1Payout = userBets[0].answer === closestAnswer ? payout(userBets[0].answer || '') * (userBets[0].chips + 1) : 0
                        const bet2Payout = userBets[1].answer === closestAnswer ? payout(userBets[1].answer || '') * (userBets[1].chips + 1) : 0

                        
                        return (
                            <div key={i} className='flex gap-3 bg-slate-300 border rounded'>
                                <p className='ml-2'>{user.name}: </p>
                                <p className={`text-lg font-bold text-center self-center text-slate-100 border ${bet1Payout + bet2Payout > 0 ? 'bg-green-500 border-green-700' : 'bg-red-500 border border-red-700'}`}> {user.chips}</p>
                            </div>
                        )
                    })
                    : null
                }
            </div> */}
        </div>
    )
}