import { create } from 'zustand'
import { AnswerGroup, Bet, BetGroup, GameState, Question, Round, User } from '../lib/types'

export interface IGameContext {
    gameState: Partial<GameState> | null
    gameId: GameState['_id'],
    users: GameState['users'],
    stage: GameState['stage'],
    currentQuestionIndex: GameState['currentQuestionIndex'],
    questions: GameState['questions'],
    currentAnswers: GameState['currentAnswers'],
    currentBets: GameState['currentBets'],
    userBets: [Bet, Bet]
    rounds: GameState['rounds'],
    allRounds: GameState['allRounds'],
    error: string | null,
    isSpectating: boolean,
}

export const defaultBets: [Bet, Bet] = [{ answer: '', chips: 0, payout: 1 }, { answer: '', chips: 0, payout: 1 }];

const initialState: IGameContext = {
    gameState: null,
    gameId: '',
    users: [],
    stage: 'lobby',
    currentQuestionIndex: 0,
    questions: [],
    currentAnswers: { answers: {}, closestAnswer: { userId: '', answer: '' } },
    currentBets: {},
    rounds: [],
    allRounds: [],
    userBets: defaultBets,
    error: null,
    isSpectating: false,
}

const useGameStore = create<IGameContext & { reset: () => void }>()((set) => ({ ...initialState, reset: () => set(initialState) }))

// ACTIONS
export const setGameState = (gameState: Partial<GameState>) => useGameStore.setState({ gameState })
export const setGameId = (gameId: string) => useGameStore.setState({ gameId })
export const setUsers = (users: User[]) => useGameStore.setState({ users })
export const setStage = (stage: 'lobby' | 'question' | 'bets' | 'tally' | 'finished') => useGameStore.setState({ stage })
export const setCurrentQuestionIndex = (currentQuestionIndex: number) => useGameStore.setState({ currentQuestionIndex })
export const setQuestions = (questions: Question[]) => useGameStore.setState({ questions })
export const setCurrentAnswers = (currentAnswers: AnswerGroup) => useGameStore.setState({ currentAnswers })
export const setCurrentBets = (currentBets: BetGroup) => useGameStore.setState({ currentBets })
export const setUserBets = (userBets: [Bet, Bet]) => useGameStore.setState({ userBets })
export const setRounds = (rounds: Round[]) => useGameStore.setState({ rounds })
export const setAllRounds = (allRounds: Round[]) => useGameStore.setState({ allRounds })
export const setError = (error: string | null) => useGameStore.setState({ error })
export const dismissError = () => useGameStore.setState({ error: null })
export const setIsSpectating = (isSpectating: boolean) => useGameStore.setState({ isSpectating })

export default useGameStore;

// UTILS
export const storeGame = (gameId: string, socketId: string) => {
    localStorage.setItem('gameId', JSON.stringify({ gameId, id: socketId }));
}

export function selectiveUpdate(newState: Partial<GameState>, socketId: string) {
    setGameState(newState)
    if (newState) {
        newState.currentQuestionIndex !== undefined && setCurrentQuestionIndex(newState.currentQuestionIndex);
        newState.users && setUsers(newState.users)
        newState.stage && setStage(newState.stage)
        newState.questions && setQuestions(newState.questions)
        newState._id && setGameId(newState._id)
        newState.currentAnswers && setCurrentAnswers(newState.currentAnswers)
        newState.currentBets && setCurrentBets(newState.currentBets)
        newState.rounds && setRounds(newState.rounds)
        newState.allRounds && setAllRounds(newState.allRounds)
        storeGame(newState._id || '', socketId)
    }
}

import { mountStoreDevtool } from 'simple-zustand-devtools';

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', useGameStore);
}