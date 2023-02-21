"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnswerGroup, Bet, GameState, Question, User } from "../lib/types";
import { useSocket } from "./socketContext";

export interface IGameContext {
    gameState: Partial<GameState> | null
    gameId: string,
    users: User[],
    stage: 'lobby' | 'question' | 'bets' | 'tally' | 'finished',
    questions: Question[],
    userBets: [Bet, Bet],
    setUsers: (users: User[]) => void,
    setGameId: (gameId: string) => void,
    setStage: (stage: 'lobby' | 'question' | 'bets' | 'tally' | 'finished') => void,
    setQuestions: (questions: Question[]) => void,
    setGameState: (gameState: Partial<GameState> | null) => void,
}

const defaultBets: [Bet, Bet] = [{answer: '', chips: 0, payout: 1}, {answer: '', chips: 0, payout: 1}];

const GameContext = createContext<IGameContext>({
    gameState: null,
    gameId: '',
    users: [],
    stage: 'lobby',
    questions: [],
    userBets: defaultBets,
    setUsers: () => { },
    setGameId: () => { },
    setStage: () => { },
    setQuestions: () => { },
    setGameState: () => { },
})

const FakeGameProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [gameId, setGameId] = useState('')
    const [stage, setStage] = useState<IGameContext['stage']>('lobby')
    const [questions, setQuestions] = useState<IGameContext['questions']>([])
    const [gameState, setGameState] = useState<Partial<GameState> | null>(null)
    const userBets =gameState?.currentBets?.me || defaultBets;

    return (
        <GameContext.Provider value={{
            gameState,
            gameId,
            users,
            stage,
            questions,
            userBets,
            setUsers,
            setGameId,
            setStage,
            setQuestions,
            setGameState
        }}>
            {children}
        </GameContext.Provider>
    )
}

export const useFakeGame = () => {
    return useContext(GameContext);
}

export default FakeGameProvider;
