"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Question, User } from "../lib/classes";
import { AnswerGroup, Bet, GameState } from "../lib/types";
import { useSocket } from "./socketContext";

export interface IGameContext {
    gameState: Partial<GameState> | null
    gameId: string,
    users: User[],
    stage: 'lobby' | 'question' | 'bets' | 'tally' | 'finished',
    questions: Question[],
    create: (username: string) => void,
    register: (username: string, gameId: string) => void,
    unregister: () => void,
    start: () => void,
    submitAnswer: (answer: string) => void,
    userBets: [Bet, Bet]
    bet: (answer: string, payout: number, betIdx: number) => void,
    betChip: (betIdx: number, amount: number) => void
}

const defaultBets: [Bet, Bet] = [{answer: '', chips: 0, payout: 1}, {answer: '', chips: 0, payout: 1}];

const GameContext = createContext<IGameContext>({
    gameState: null,
    gameId: '',
    users: [],
    stage: 'lobby',
    questions: [],
    create: () => { },
    register: () => { },
    unregister: () => { },
    start: () => { },
    submitAnswer: () => { },
    userBets: defaultBets,
    bet: () => { },
    betChip: () => { }
})

const GameProvider = ({ children }: { children: ReactNode }) => {
    const { socket, storeGame } = useSocket();
    const [users, setUsers] = useState<User[]>([]);
    const [gameId, setGameId] = useState('')
    const [stage, setStage] = useState<IGameContext['stage']>('lobby')
    const [questions, setQuestions] = useState<IGameContext['questions']>([])
    const [gameState, setGameState] = useState<Partial<GameState> | null>(null)
    const userBets = socket?.id ? gameState?.currentBets?.[socket.id] || defaultBets : defaultBets;


    const create = useCallback((user: string) => {
        if (socket) {
            socket.emit('create', user);
        }
    }, [socket])

    const register = useCallback((username: string, gameToJoin: string) => {
        if (socket) {
            socket.emit('register', username, gameToJoin);
            storeGame(gameToJoin)
        }
    }, [socket, storeGame])

    const unregister = useCallback(() => {
        if (socket) {
            socket.emit('unregister');
        }
    }, [socket])

    const start = useCallback(() => {
        if (socket) {
            socket.emit('start')
        }
    }, [socket])

    const submitAnswer = useCallback((answer: string) => {
        if (socket) {
            socket.emit('submitAnswer', answer)
        }
    }, [socket])

    const bet = useCallback((answer: string, payout: number, betIdx: number) => {
        if (socket) {
            socket.emit('bet', answer, payout, betIdx)
        }
    }, [socket])

    const betChip = useCallback((betIdx: number, amount: number = 1) => {
        console.log('betChip', betIdx, amount);
        
        if (socket) {
            socket.emit('betChip', betIdx, amount)
        }
    }, [socket])

    useEffect(() => {

        if (socket) {
            socket.on('gameState', (state) => {
                console.log('Received message from server:');
                console.log(state);
                setUsers(state.users || [])
                setStage(state.stage || 'lobby')
                setQuestions(state.questions || [])
                setGameId(state.id || '')
                setGameState(state)
                storeGame(state.id || '')
            });
        }

        socket.on('noReconnect', () => {
            console.log('No reconnect');
        });

        return () => {
            if (socket) {
                socket.off('gameState');
            }
        }
    }, [socket]);

    return (
        <GameContext.Provider value={{
            gameState,
            gameId,
            users,
            stage,
            questions,
            create,
            register,
            unregister,
            start,
            submitAnswer,
            userBets,
            bet,
            betChip
        }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => {
    return useContext(GameContext);
}

export default GameProvider;
