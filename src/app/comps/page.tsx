'use client'

import React from "react";
import AnswerSpot, { AnswerCard } from "../../components/AnswerSpot";
import BetResult from "../../components/BetResult";
import ChipStack from "../../components/ChipStack";
import Player from "../../components/Player";
import QuestionProgress from "../../components/QuestionProgress";
import { TimerBar } from "../../components/Timer";
import Token from "../../components/Token";
import splitChipsIntoGroups from "../../lib/splitChips";

const WIDTH = 24;
const CURRENT_QUESTION = 1;
const PLAYERS = [
    'john',
    'jim',
    'josh',
    'jared',
    'joe',
]
const ANSWERS = [
    '13',
    '23',
    '43',
    '98',
    '134',
]

const MIDDLE = ANSWERS.length % 2 === 0 ? ANSWERS.length / 2 : (ANSWERS.length - 1) / 2;

export default function Page() {
    return (
        <div className='p-5 grid'>
            <h1 className="text-2xl font-bold">
                Components
            </h1>
            <Container>
                <Player name="NAME" id='1asd2' image="IMAGE" score={0} />
            </Container>
            <Container>
                <div className="flex gap-2 justify-between">
                    {
                        PLAYERS.map((name, i) => (
                            <Player key={name} id='1asd2' name={name} image="IMAGE" score={0} />
                        ))
                    }
                </div>
            </Container>
            <Container>
                <QuestionProgress currentQuestion={CURRENT_QUESTION} totalQuestions={10} />
            </Container>
            <Container>
                <div className="grid grid-cols-5 gap-2">
                    {
                        ANSWERS.map((answer, i) => (
                            <AnswerSpot
                                key={'answer' + i}
                                answer={answer}
                                odds={`${(Math.abs(MIDDLE - i) + 2).toString()}-1`}
                                onDrop={(betIndex) => console.log(betIndex)} />
                        ))
                    }
                </div>
            </Container>
            <Container>
                <AnswerCard
                    onDrop={console.log}
                    tokens={[<Token key={'yeppy'} token='wejjs' index={123} />, <Token key={'ppy'} token='wejjs' index={123} />]}
                    chips={splitChipsIntoGroups(135)}
                    label='label'
                    answer='answer'
                    otherBets={[]}
                    odds='2-1'
                    userChips={100}
                />
                <AnswerCard
                    onDrop={console.log}
                    tokens={[<Token key={'yeppy'} token='wejjs' index={123} />, <Token key={'ppy'} token='wejjs' index={123} />]}
                    chips={splitChipsIntoGroups(0)}
                    label='label'
                    answer='answer'
                    otherBets={[]}
                    odds='2-1'
                    userChips={100}
                />
            </Container>
            <Container>
                <TimerBar timer={5} />
                <TimerBar timer={15} />
                <TimerBar timer={25} />
            </Container>
            <Container>
                <Token token="hslfj" index={1234} />
            </Container>
            <Container>
                <ChipStack chips={10} type='fifty' />
                <ChipStack chips={5} type='ten' />
                <ChipStack chips={4} type='five' />
                <ChipStack chips={3} type='five' />
                <ChipStack chips={2} type='twenty' />
                <ChipStack chips={1} type='twenty' />
            </Container>
            <Container>
                <BetResult verbose={true} answer="13" bet={{ answer: '13', bet: 1, odds: 2, payout: 3 }} />
                <BetResult verbose={true} answer="13" bet={{ answer: '12', bet: 100, odds: 2, payout: 3 }} />
                <BetResult verbose={true} answer="13" bet={{ answer: '14', bet: 1, odds: 2, payout: 3 }} />
            </Container>
        </div>
    )
}

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='p-6 flex gap-5'>
            {children}
        </div>
    )
}