import { create } from 'zustand'
import { AnswerGroup, Bet, BetGroup, GameState, Question, Round, User } from '../../lib/types'

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

const initialGameState: GameState = {
    _id: '',
    users: [
        {
            id: '1234',
            name: 'Jim',
            chips: 234,
            active: true,
        },
        {
            id: '5678',
            name: 'Bob',
            chips: 234,
            active: true,
        },
        {
            id: '9101',
            name: 'Sally',
            chips: 234,
            active: true,
        },
    ],
    questions: [
        {
            question: 'question',
            answer: 'answer',
        },
    ],
    currentQuestionIndex: 0,
    currentAnswers: {
        answers: {
            '1234': {
                answer: '1234',
                isCorrect: true,
            },
            '5678': {
                answer: '12345',
                isCorrect: false,
            },
            '9101': {
                answer: '123456',
                isCorrect: false,
            },
        },
        closestAnswer: {
            userId: '1234',
            answer: 'answer',
        },
    },
    currentBets: {
        '1234': [
            {
                answer: 'answer',
                chips: 10,
                payout: 1,
            },
            {
                answer: 'not answer',
                chips: 10,
                payout: 1,
            },
        ],
        '5678': [
            {
                answer: 'answer',
                chips: 10,
                payout: 1,
            },
            {
                answer: 'not answer',
                chips: 10,
                payout: 1,
            },
        ],
        '9101': [
            {
                answer: 'answer',
                chips: 10,
                payout: 1,
            },
            {
                answer: 'not answer',
                chips: 10,
                payout: 1,
            },
        ],
    },
    rounds: [],
    allRounds: [],
    stage: 'lobby',
}


const initialState: IGameContext = {
    gameState: initialGameState,
    gameId: initialGameState._id,
    users: initialGameState.users,
    stage: 'lobby',
    currentQuestionIndex: initialGameState.currentQuestionIndex,
    questions: initialGameState.questions,
    currentAnswers: initialGameState.currentAnswers,
    currentBets: initialGameState.currentBets,
    rounds: [],
    allRounds: [],
    userBets: defaultBets,
    error: null,
    isSpectating: false,
}

const useFakeGameStore = create<IGameContext & { reset: () => void }>()((set) => ({ ...initialState, reset: () => set(initialState) }))

// ACTIONS
export const setGameState = (gameState: Partial<GameState>) => useFakeGameStore.setState({ gameState })
export const setGameId = (gameId: string) => useFakeGameStore.setState({ gameId })
export const setUsers = (users: User[]) => useFakeGameStore.setState({ users })
export const setStage = (stage: GameState['stage']) => useFakeGameStore.setState({ stage })
export const setCurrentQuestionIndex = (currentQuestionIndex: number) => useFakeGameStore.setState({ currentQuestionIndex })
export const setQuestions = (questions: Question[]) => useFakeGameStore.setState({ questions })
export const setCurrentAnswers = (currentAnswers: AnswerGroup) => useFakeGameStore.setState({ currentAnswers })
export const setCurrentBets = (currentBets: BetGroup) => useFakeGameStore.setState({ currentBets })
export const setUserBets = (userBets: [Bet, Bet]) => useFakeGameStore.setState({ userBets })
export const setRounds = (rounds: Round[]) => useFakeGameStore.setState({ rounds })
export const setAllRounds = (allRounds: Round[]) => useFakeGameStore.setState({ allRounds })
export const setError = (error: string | null) => useFakeGameStore.setState({ error })
export const dismissError = () => useFakeGameStore.setState({ error: null })
export const setIsSpectating = (isSpectating: boolean) => useFakeGameStore.setState({ isSpectating })

export default useFakeGameStore;

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
    mountStoreDevtool('Store', useFakeGameStore);
}