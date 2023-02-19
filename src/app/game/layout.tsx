'use client'

import { SyntheticEvent, useState } from "react"
import { useGame } from "../../context/gameContext"
import { useRouter } from 'next/navigation';
import JoinLink from "./(JoinLink)"
import { useSocket } from "../../context/socketContext"
import Player from "../../components/Player";
import Token from "../../components/Token";
import Chip from "../../components/Chip";
import ChipStack from "../../components/ChipStack";
import QuestionProgress from "../../components/QuestionProgress";


export default function GamePage({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { socket } = useSocket();
    const { gameState, gameId, users, stage, userBets } = useGame()

    const user = gameState?.users?.find(user => user.id === socket.id);
    const chipGroups = Math.floor(user?.chips ? user.chips / 5 : 0);
    const remainingChips = user?.chips ? user.chips % 5 : 0;



    return (
        <div className='h-full p-5 flex flex-col justify-between'>
            <div className="flex items-center justify-between">
                {gameId ? <JoinLink id={gameId} /> : null}
                <QuestionProgress currentQuestion={gameState?.currentQuestionIndex || 0} totalQuestions={10} />
                <div className='flex flex-col items-center'>
                    <p className="font-bold">
                        Stage: {stage}
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-6'>
                <h1 className='text-2xl font-bold'>Trivia Game</h1>
                {stage === 'bets' ? <p>Bets: {JSON.stringify(userBets)}</p> : null}
                <div className='flex flex-col w-full'>
                    {children}
                </div>
            </div>
            <div className="flex justify-between">

                <div className="flex gap-3">
                    {
                        users.map((user, i) => <div key={i} className='flex flex-row items-center'>
                            <Player key={user.id} name={user.name} image="IMAGE" score={user.chips} />
                        </div>)
                    }
                </div>
                <div className="flex gap-3">
                    <div>
                        {[0, 1].map(idx => (
                            <Token key={`token${idx}`} index={idx} token="123" />
                        ))}
                    </div>
                    <div className="grid grid-cols-5 relative">
                        {chipGroups > 0 ? Array(chipGroups).fill(0).map((_, i) => (
                            <ChipStack chips={5} key={`user-token-${i}}`} />
                        )
                        ) : null}
                        {remainingChips > 0 ? (
                            <ChipStack chips={remainingChips} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}