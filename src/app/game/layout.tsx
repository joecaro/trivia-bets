'use client'

import { useRouter } from 'next/navigation';
import JoinLink from "./(JoinLink)"
import SocketProvider, { useSocket } from "../../context/socketContext"
import Player from "../../components/Player";
import Token from "../../components/Token";
import ChipStack from "../../components/ChipStack";
import QuestionProgress from "../../components/QuestionProgress";
import DragProvider from "../../context/DndContext";
import GameSettings from "./(GameSettings)";
import splitChipsIntoGroups from "../../lib/splitChips";
import ErrorModal from "./(ErrorModal)";
import { Chips } from "../../lib/types";
import TimerProvider from "../../context/timerContext";
import useGameStore, { defaultBets } from '../../zustand/gameStore';
import equal from 'fast-deep-equal';
import { useMemo } from 'react';


const chipDisplay = {
    one: 1,
    five: 5,
    ten: 10,
    twenty: 20,
    fifty: 50,
}

export default function GamePage({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    return (
        <SocketProvider>
                <TimerProvider>
                    <DragProvider>
                        <PageLayout>
                            {children}
                            <ErrorModal />
                        </PageLayout>
                    </DragProvider>
                </TimerProvider>
        </SocketProvider>
    )
}

function PageLayout({ children }: { children: React.ReactNode }) {
    const { socket } = useSocket();
    const currentQuestionIndex = useGameStore(state => state.currentQuestionIndex)
    const stage = useGameStore(state => state.stage)
    const users = useGameStore(state => state.users, (a, b) => equal(a, b))
    const currentBets = useGameStore(state => state.currentBets, (a, b) => equal(a, b))

    const userBets = useMemo(() => socket.id ? currentBets[socket.id] || defaultBets : defaultBets, [currentBets, socket]);


    const user = users?.find(user => user.id === socket.id);
    const isHost = users?.[0]?.id === socket.id;
    const chipGroups = splitChipsIntoGroups(user?.chips || 0)

    return (
        <div className='h-full p-5 flex flex-col justify-between'>
            <div className="grid grid-cols-4 gap-y-2">
                <JoinLink />
                <QuestionProgress currentQuestion={currentQuestionIndex || 0} totalQuestions={10} />
                <GameSettings />
            </div>
            <div className='flex flex-col items-center gap-6'>
                {isHost && stage === 'bets' ? <p>Bets: {JSON.stringify(userBets)}</p> : null}
                <div className='flex flex-col w-full'>
                    {children}
                </div>
            </div>
            <div className="flex justify-between items-end">
                <div className="flex gap-3">
                    {
                        users.map((user, i) => <div key={i} className='flex flex-row items-center'>
                            <Player key={user.id} name={user.name} id={user.id} image="IMAGE" score={user.chips} />
                        </div>)
                    }
                </div>
                <div className="flex gap-3">
                    <div className="flex gap-1">
                        {!userBets[0].answer ? (
                            <Token index={0} token="123" />
                        ) : null}
                        {!userBets[1].answer ? (
                            <Token index={1} token="123" />
                        ) : null}
                    </div>
                    <div className="grid grid-cols-5 relative">
                        {
                            Object.entries(chipGroups).map(([key, value], i) => (
                                <div className="border border-slate-200 h-16 w-10 grid" key={"user-chips" + key}>
                                    <span className="text-slate-400">{chipDisplay[key as keyof typeof chipDisplay]}</span>
                                    <ChipStack type={key as keyof Chips} chips={value} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}