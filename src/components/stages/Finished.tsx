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
    maintainAspectRatio: false,
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

    const labels = gameState?.rounds?.map((round, idx) => `Round ${idx + 1}`) || []

    const data = {
        labels,
        datasets: users.map(user => {
                const randomDegree = Math.floor(Math.random() * 360)
                return {
                    label: user.name,
                    data: gameState?.rounds?.map(round => round.scores[user.id]),
                    borderColor: `hsl(${randomDegree}, 100%, 50%)`,
                    backgroundColor: `hsla(${randomDegree}, 100%, 50%, 0.5)`
                }
            }),
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-3">
                {users.map(user => (
                    <div key={`result-${user.id}`}>
                        <p className="text-xl font-bold text-slate-100">{user.name}</p>
                        <p>{user.chips}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>Game Done</p>
            </div>
            <div className="flex gap-3 bg-white rounded p-2 shadow-md">
                <Line height={400} width={500} options={options} data={data} />
            </div>
        </div>
    )
}