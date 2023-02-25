'use client'

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Bets from "../../components/stages/Bets";
import Finished from "../../components/stages/Finished";
import Question from "../../components/stages/Question";
import Tally from "../../components/stages/Tally";
import { useGame } from "../../context/gameContext";
import { useSocket } from "../../context/socketContext";
import JoinModal from "./(JoinModal)";

export default function Lobby() {
    const [showJoinModal, setShowJoinModal] = useState(true)
    const { socket } = useSocket()
    const { create, register, nextStage, newGame, stage, gameId, users } = useGame()

    const searchParams = useSearchParams();
    const joinId = searchParams.get('joinId');

    if (gameId && showJoinModal) {
        setShowJoinModal(false)
    }

    const user = users?.find(user => user.id === socket.id);
    const isHost = users && users[0] && users[0].id === socket.id;

    return (
        <>
            {
                stage === 'lobby' ? (
                    <JoinModal onClose={() => setShowJoinModal(false)} show={showJoinModal} joinId={joinId} onCreate={create} onJoin={register} />
                )
                    : stage === 'question' ? (
                        <Question />
                    )
                        : stage === 'bets' ? (
                            <Bets />
                        )
                            : stage === 'tally' ? (
                                <Tally />
                            )
                                : stage === 'finished' ? (
                                    <Finished />
                                )
                                    : null
            }
            <div className="flex justify-end p-4">
                {isHost && <button
                    onClick={stage === 'finished' ? newGame : nextStage}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                    {stage === 'lobby' ? 'Start Game' : 'Next Stage'}
                </button>}
            </div>
        </>
    )
}