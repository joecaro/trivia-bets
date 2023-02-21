'use client'

import { SyntheticEvent, useState } from "react"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useGame } from "../../context/gameContext"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

export default function Finished() {
    const { gameState, users } = useGame()

    const labels = gameState?.allRounds?.map((round, idx) => `Round ${idx + 1}`) || []

    const data = {
        labels,
        datasets: users.map(user => {
            const randomDegree = Math.floor(Math.random() * 360)
            return {
                label: user.name,
                data: gameState?.allRounds?.map(round => round.scores[user.id]),
                borderColor: `hsl(${randomDegree}, 100%, 50%)`,
                backgroundColor: `hsla(${randomDegree}, 100%, 50%, 0.5)`
            }
        }),
    };

    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-center justify-center">
                <div>
                    <p className="text-lg font-bold">Congrats!</p>
                </div>
                <div className="flex flex-col gap-3 border p-2 rounded">
                    {users.sort((a, b) => b.chips - a.chips).map((user, idx) => (
                        <div key={`result-${user.id}`} className={`flex gap-8 justify-between items-center rounded p-2 ${idx === 0 ? "bg-animated" : idx % 2 === 0 ? "bg-slate-100" : ''}`}>
                            <p className=" text-slate-800">{user.name}</p>
                            <p className="text-xl font-bold">{user.chips}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-3 bg-white rounded p-2 shadow-md">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}