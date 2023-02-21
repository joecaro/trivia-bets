const STAGE_MAP = {
    "lobby": "lobby",
    "question": "question",
    "bets": "bets",
    "tally": "tally",
    "finished": "finished"
}

export type Question = {
    question: string,
    answer: string[],
}

export type User = {
    id: string,
    name: string,
    chips: number,
    active: boolean,
}

export type UserId = string;

export type AnswerGroup = {
    answers: {
        [userId: string]: {
            answer: string,
            isCorrect: boolean
        }
    },
    closestAnswer: {
        userId: string,
        answer: string
    }
}

export type Bet = {
    answer: string | null,
    chips: number,
    payout: number
}
export type BetGroup = {
    [userId: string]: [Bet, Bet]
}

export type Round = {
    bets: BetGroup;
    answers: AnswerGroup
    scores: { [userId: UserId]: number }
}

export interface GameState {
    _id: string;
    users: User[];
    questions: Question[];
    currentQuestionIndex: number;
    currentAnswers: AnswerGroup;
    currentBets: BetGroup;
    rounds: Round[];
    allRounds: Round[];
    stage: keyof typeof STAGE_MAP;
};