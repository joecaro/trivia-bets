import useGameStore from "../../zustand/gameStore";

const stageDescriptions: { [key: string]: string } = {
    lobby: 'Waiting for players to join',
    question: 'Answer with a positive integer. Try to get close, but don\'t go over!',
    bets: 'Place your bets. Your tokens are free to move around and can\'t be lost. Add chips to any bet to increase your payout.',
    betResults: 'The blinking bet is the closest to the correct answer without going over.',
    tally: 'The payout shown is added to your total tokens. That equals the total chips you put in times the payout. The correct answer is shown below.',
}

export default function RightCorner() {
    const stage = useGameStore((state) => state.stage);

    return (
        <div className='col-start-1 py-2 px-4 bg-slate-200 border-slate-400 opacity-80 text-slate-700 rounded-md flex flex-wrap justify-center items-center w-fit'>
            {
                stage ? (
                    <div>
                        <p className="font-bold">
                            Stage: {stage}
                        </p>
                        <p className="font-bold p-2 border border-slate-600 rounded">
                            {stageDescriptions[stage]}
                        </p>
                    </div>
                ) : null
            }
        </div>
    )
}