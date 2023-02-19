'use client'

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Bets from "../../components/stages/Bets";
import Question from "../../components/stages/Question";
import Tally from "../../components/stages/Tally";
import FakeGameProvider, { useFakeGame } from "../../context/fakeGameContext";

export default function Lobby() {
    const [showJoinModal, setShowJoinModal] = useState(true)

    const searchParams = useSearchParams();
    const joinId = searchParams.get('joinId');

    return (
        <FakeGameProvider>
            <Page />
        </FakeGameProvider>
    )
}

const Page = () => {
    const { stage, setStage } = useFakeGame();
    return (
        <>
            {
                stage === 'lobby' ? (
                    <div>Lobby</div>
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
                                : null
            }
            <div className="flex justify-end p-4">
                <button
                    onClick={() => setStage('question')}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                    {stage === 'lobby' ? 'Start Game' : 'Next Stage'}
                </button>
            </div>
        </>
    )
}