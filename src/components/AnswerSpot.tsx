'use client';
import equal from 'fast-deep-equal';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd'

import { useSocket } from "../context/socketContext";
import splitChipsIntoGroups from '../lib/splitChips';
import { Bet, Chips } from '../lib/types';
import useGameStore, { defaultBets } from '../zustand/gameStore';
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
    const users = useGameStore(state => state.users, (a, b) => equal(a, b))
    const currentBets = useGameStore(state => state.currentBets, (a, b) => equal(a, b))
    const { socket } = useSocket();

    
    const userBets = useMemo(() => socket.id ? currentBets[socket.id] || defaultBets : defaultBets, [currentBets, socket]);


    const userChips = users?.find(user => user.id === socket.id)?.chips || 0;

    const tokens = userBets.map((bet, idx) => {
        if (bet.answer === answer) {
            return <Token key={idx} index={idx} token='123' />
        } else return null;
    }).filter(token => token !== null)

    const chips = useMemo(() => {
        const chipsAmount = userBets.filter(bet => bet.answer === answer)[0]?.chips || 0

        return splitChipsIntoGroups(chipsAmount)
    }, [userBets, answer])


    const otherBets = Object.entries(currentBets || {}).filter(bet => bet[0] !== socket.id)

    return (
        <div>
            <AnswerCard
                onDrop={onDrop}
                tokens={tokens}
                chips={chips}
                label={label}
                answer={answer}
                otherBets={otherBets}
                odds={odds}
                userChips={userChips}
            />
        </div>
    );
}

type CardProps = {
    onDrop: (betIndex: number) => void,
    tokens: (JSX.Element | null)[],
    chips: Chips,
    label?: string,
    answer?: string,
    otherBets: [string, [Bet, Bet]][],
    odds: string,
    userChips: number
}

export function AnswerCard({ onDrop, tokens, chips, label, answer, otherBets, odds, userChips }: CardProps) {
    const { betChip } = useSocket();
    const stage = useGameStore(state => state.stage)
    const currentAnswers = useGameStore(state => state.currentAnswers, (a, b) => equal(a, b))
    const [collectedProps, drop] = useDrop(() => ({
        accept: 'token',
        drop: (item: { idx: number }) => {
            onDrop(item.idx)
        }
    }))

    return (
        <div className='grid gap-2'>
            <div
                ref={drop}
                className={` ${!answer && 'opacity-30'} ${stage === 'betResults' && answer === currentAnswers.closestAnswer.answer ? "pulse-bg" : ''} bg-slate-400 rounded flex flex-col justify-between items-center cursor-pointer w-40 h-60 relative shadow`}
            >
                <div className="flex gap-3 absolute top-0 left-0 w-full">
                    <div className='px-1 py-2'>
                        {tokens.map(token => token)}
                    </div>
                    <div className="w-full flex flex-wrap justify-center gap-1">
                        {Object.entries(chips).map(([chip, amount], idx) => (
                            <ChipStack
                                key={`user-bet-${chip}-${idx}-${answer}`}
                                chips={amount}
                                type={chip as keyof Chips}
                            />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col w-full flex-1 justify-center items-center'>
                    <p className={`w-3/4 py-2 px-5 bg-amber-100 rounded-sm  text-slate-800 ${label ? 'text-lg' : 'text-2xl'} flex justify-center items-center shadow`}>{label || answer || ''}</p>
                </div>
                <div className='grid grid-cols-3 bg-slate-300 w-full rounded p-1'>
                    <div></div>
                    <p className="text-slate-100 bg-slate-500 text-center rounded">{odds}</p>
                    <div>
                        <div className='flex px-1 gap-1'>
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
                </div>
            </div>
            <div className='h-7 my-1 flex justify-between gap-1'>
                {tokens.length > 0 && (
                    <>
                        <button disabled={userChips < 1} className={`py-1 px-2 bg-blue-500 text-blue-50 rounded flex-1 text-xs whitespace-nowrap ${userChips < 1 ? 'opacity-50 hover:cursor-not-allowed' : ''}`} onClick={() => betChip(tokens[0]?.props.index, 1)}>+1 chip</button>
                        <button disabled={userChips < 5} className={`py-1 px-2 bg-blue-500 text-blue-50 rounded flex-1 text-xs ${userChips < 5 ? 'opacity-50 hover:cursor-not-allowed' : ''}`} onClick={() => betChip(tokens[0]?.props.index, 5)}>+5</button>
                        <button disabled={userChips < 10} className={`py-1 px-2 bg-blue-500 text-blue-50 rounded flex-1 text-xs ${userChips < 10 ? 'opacity-50 hover:cursor-not-allowed' : ''}`} onClick={() => betChip(tokens[0]?.props.index, 10)}>+10</button>
                    </>
                )}
            </div>
        </div>
    )
}

