'use client'

import React from "react";
import AnswerSpot from "../../components/AnswerSpot";
import Chip from "../../components/Chip";
import ChipStack from "../../components/ChipStack";
import Player from "../../components/Player";
import QuestionProgress from "../../components/QuestionProgress";
import Token from "../../components/Token";

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
                <Player name="NAME" image="IMAGE" score={0} />
            </Container>
            <Container>
                <div className="flex gap-2 justify-between">
                    {
                        PLAYERS.map((name, i) => (
                            <Player key={name} name={name} image="IMAGE" score={0} />
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
                <Token token="hslfj" index={1234} />
            </Container>
            <Container>
                <Chip num={1}/>
            </Container>
            <Container>
                <ChipStack chips={10}/>
                <ChipStack chips={5}/>
                <ChipStack chips={4}/>
                <ChipStack chips={3}/>
                <ChipStack chips={2}/>
                <ChipStack chips={1}/>
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