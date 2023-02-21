'use client'

import GameProvider, { useGame } from "../../context/gameContext"
import { useRouter } from 'next/navigation';
import JoinLink from "./(JoinLink)"
import SocketProvider, { useSocket } from "../../context/socketContext"
import Player from "../../components/Player";
import Token from "../../components/Token";
import ChipStack from "../../components/ChipStack";
import QuestionProgress from "../../components/QuestionProgress";
import DragProvider from "../../context/DndContext";
import GameSettings from "./(GameSettings)";


export default function GamePage({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    return (
        <SocketProvider>
            <GameProvider>
                <DragProvider>
                    <PageLayout>
                        {children}
                    </PageLayout>
                </DragProvider>
            </GameProvider>
        </SocketProvider>
    )
}

function PageLayout({ children }: { children: React.ReactNode}) {
    const { socket } = useSocket();
    const { gameState, stage, users, userBets } = useGame()

    const user = gameState?.users?.find(user => user.id === socket.id);
    const chipGroups = Math.floor(user?.chips ? user.chips / 5 : 0);
    const remainingChips = user?.chips ? user.chips % 5 : 0;

    return (
        <div className='h-full p-5 flex flex-col justify-between'>
            <div className="grid grid-cols-4 gap-y-2">
                <JoinLink />
                <QuestionProgress currentQuestion={gameState?.currentQuestionIndex || 0} totalQuestions={10} />
               <GameSettings />
            </div>
            <div className='flex flex-col items-center gap-6'>
                {stage === 'bets' ? <p>Bets: {JSON.stringify(userBets)}</p> : null}
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
                    <div>
                        {!userBets[0].answer ? (
                            <Token index={0} token="123" />
                        ) : null}
                        {!userBets[1].answer ? (
                            <Token index={1} token="123" />
                        ) : null}
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