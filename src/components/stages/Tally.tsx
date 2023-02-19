'use client'

import { useGame } from "../../context/gameContext"


export default function Tally() {
    const { gameState, users, questions } = useGame()
    const bets = gameState?.currentBets
    const answers = gameState?.currentAnswers


    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <p>{questions[gameState?.currentQuestionIndex || 0].question}</p>
            <p>Correct Answer: {questions[gameState?.currentQuestionIndex || 0].answer}</p>
            <h1 className="text-2xl font-bold">Tally</h1>
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

                        const bet1Payout = userBets[0].answer === closestAnswer ? payout(userBets[0].answer || '') * (userBets[0].chips + 1) : userBets[0].chips 
                        const bet1Text = userBets[0].answer === closestAnswer ? `${userBets[0].chips + 1} X ${userBets[0].payout}:1 = ${bet1Payout} chips` : `-${userBets[0].chips} chips`

                        const bet2Payout = userBets[1].answer === closestAnswer ? payout(userBets[1].answer || '') * (userBets[1].chips + 1) : userBets[1].chips
                        const bet2Text = userBets[1].answer === closestAnswer ? `${userBets[1].chips + 1} X ${userBets[1].payout}:1 = ${bet2Payout} chips` : `-${userBets[1].chips} chips`

                        return (
                            <div key={i} className='grid grid-cols-3 justify-center gap-2 border shadow-sm rounded p-2 bg-slate-500'>
                                <p className='ml-2'>{user.name}: </p>
                                <div className="grid gap-2">
                                    <div className="flex gap-1">
                                        <p className={`w-8 h-8 flex justify-center items-center rounded-sm text-center ${userBets[0].answer === closestAnswer ? 'bg-green-800' : 'bg-red-800'}`}>{userBets[0].answer}</p>
                                        <p>{bet1Text}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <p className={`w-8 h-8 flex justify-center items-center rounded-sm text-center ${userBets[1].answer === closestAnswer ? 'bg-green-800' : 'bg-red-800'}`}>{userBets[1].answer}</p>
                                        <p>{bet2Text}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-center self-center"> {user.chips}</p>
                            </div>
                        )
                    })
                    : null
                }
            </div>
        </div>
    )
}