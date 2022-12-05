import { Question, User } from "./classes";

const STAGE_MAP = {
    "lobby": "lobby",
    "question": "question",
    "bets": "bets",
    "tally": "tally",
    "finished": "finished"
}

export type AnswerGroup = {
    answers: { [userId: string]: string },
    correctAnswer: string | null
}

export type Round = {
    bets: {
        [userId: string]: {
            tokens: [number | null, number | null],
            chips: number[]
        }
    }
}

export interface GameState {
    users: { [userId: string]: User },
    userList: User[]
    currentQuestionIndex: number;
    currentQuestion: Question | null;
    questions: Question[];
    answers: AnswerGroup[];
    rounds: Round[];
    stage: keyof typeof STAGE_MAP;
    isFinished: boolean;
};