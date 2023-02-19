'use client';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd'

import { useGame } from "../context/gameContext";
import { useSocket } from "../context/socketContext";
import Chip from './Chip';
import ChipStack from './ChipStack';
import Token from "./Token";

type AnswerSpotProps = {
    label?: string,
    answer?: string,
    onDrop: (betIndex: number) => void,
    odds: string
}

export default function AnswerSpot({
    label,
    answer,
    onDrop,
    odds
}: AnswerSpotProps) {
    const { betChip, userBets, gameState } = useGame()
    const { socket } = useSocket();


    const userChips = gameState?.users?.find(user => user.id === socket.id)?.chips || 0;

    const [collectedProps, drop] = useDrop(() => ({
        accept: 'token',
        drop: (item: { idx: number }) => {
            onDrop(item.idx)
        }
    }))

    const tokens = userBets.map((bet, idx) => {
        if (bet.answer === answer) {
            return <Token key={idx} index={idx} token='123' />
        } else return null;
    }).filter(token => token !== null)

    const chips = useMemo(() => {
        const chipsAmount = userBets.filter(bet => bet.answer === answer)[0]?.chips || 0

        return splitChipsIntoGroups(chipsAmount)
    }, [userBets, answer])


    const otherBets = Object.entries(gameState?.currentBets || {}).filter(bet => bet[0] !== socket.id)

    return (
        <div>

            <div
                ref={drop}
                className={`p-2 ${!answer && 'opacity-30'} bg-slate-800 border-2 border-slate-200 rounded flex flex-col justify-between items-center cursor-pointer w-40 relative`}
            >
                <div className="absolute top-0 left-0">
                    {tokens.map(token => token)}
                </div>
                <div className="absolute bottom-0 w-full flex flex-wrap gap-3">
                    {!!chips.length && chips.map((chips, idx) => <ChipStack key={`${answer}-chips-${idx}`} chips={chips} />)}
                </div>
                <p className={`w-3/4 h-40 px-5 mb-6 border-2 border-slate-100 rounded-sm bg-blue-100  text-slate-800 ${label ? 'text-lg' : 'text-2xl'} flex justify-center items-center`}>{label || answer || ''}</p>
                <p className="text-slate-300">{odds}</p>
            </div>
            <div className='min-h-5 flex justify-between gap-1'>
                {tokens.length > 0 && (
                    <>
                        <button disabled={userChips < 1} className={`py-1 px-2 bg-blue-500 text-blue-50 rounded flex-1 ${userChips < 1 ? 'opacity-50 hover:cursor-not-allowed' : ''}`} onClick={() => betChip(tokens[0]?.props.index, 1)}>+1</button>
                        <button disabled={userChips < 5} className={`py-1 px-2 bg-blue-500 text-blue-50 rounded flex-1 ${userChips < 5 ? 'opacity-50 hover:cursor-not-allowed' : ''}`} onClick={() => betChip(tokens[0]?.props.index, 5)}>+5</button>
                        <button disabled={userChips < 10} className={`py-1 px-2 bg-blue-500 text-blue-50 rounded flex-1 ${userChips < 10 ? 'opacity-50 hover:cursor-not-allowed' : ''}`} onClick={() => betChip(tokens[0]?.props.index, 10)}>+10</button>
                    </>
                )}

            </div>
            <div className='flex gap-1'>
                {otherBets.map(([userId, bets], idx) => (
                    <div className='py-1' key={userId}>
                        {
                            bets.map((bet, idx) => {
                                if (bet.answer === answer) {
                                    return <div key={userId + idx + 'bet'} className='w-2 h-2 rounded bg-slate-50' />
                                } else return null;
                            })
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

function splitChipsIntoGroups(chips: number): number[] {
    const groups = [];

    // split chips into groups of 5 for the first 10 chips
    if (chips <= 10) {
        for (let i = 5; i <= chips; i += 5) {
            groups.push(5);
        }
        chips % 5 > 0 && groups.push(chips % 5)
    }
    // split chips into groups of 10 till 100
    else if (chips <= 100) {
        for (let i = 5; i <= 10; i += 5) {
            groups.push(5);
        }
        for (let i = 20; i <= chips; i += 10) {
            groups.push(10);
        }
        chips % 10 > 0 && groups.push(chips % 10)
    }
    // split chips into groups of 20 for any remaining chips
    else {
        for (let i = 0; i <= 10; i += 5) {
            groups.push(5);
        }
        for (let i = 20; i <= 100; i += 10) {
            groups.push(10);
        }
        for (let i = 120; i <= chips; i += 20) {
            groups.push(20);
        }
        chips % 20 > 0 && groups.push(chips % 20)
    }

    return groups;
}