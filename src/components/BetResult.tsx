type BetResult = {
    answer: string | null,
    bet: number,
    odds: number,
    payout: number,
}

type Payout = number | 'NO BET' | 'TOO HIGH' | 'TOO LOW'

type Props = {
    verbose: boolean,
    bet: BetResult,
    answer: string | 'none',
    className?: string,
}
export default function BetResult({ verbose, bet, answer, className }: Props) {

    const payout = (v: string) => {
        const correctAnswer = Number(v);
        const userAnswer = Number(bet.answer);

        // no bet
        if (bet.answer === null) {
            return 'NO BET'
        }

        // answer is a number
        if (correctAnswer === userAnswer) {
            return (bet.bet + 1) * bet.odds;
        }

        if (userAnswer > correctAnswer) {
            return 'TOO HIGH'
        }

        if (userAnswer < correctAnswer) {
            return 'TOO LOW'
        }

        // answer is smaller than all -> "none"
        if (v === 'none') {
            if (v === bet.answer) {
                return (bet.bet + 1) * bet.odds;
            }
            return "TOO HIGH"
        }

        return 'NO BET'
    }

    return (
        <div className={`relative rounded overflow-hidden flex ${className}`}>
            {verbose && !isNaN(Number(payout(answer))) && <div className="color-wheel-background-rotate" />}
            <div className="p-2 flex flex-col gap-3 bg-slate-200 border border-gray-400 rounded self-stretch m-1 rotating-border">
                {verbose &&
                    <>
                        <div className="grid grid-cols-2">
                            <p className="text-slate-600">Answer:</p>
                            <p className="text-center font-bold">{bet.answer}</p>
                        </div>
                        <div className="grid grid-cols-2 justify-items-center">
                            <p className="text-slate-600">Total Bet:</p>
                            <div className="px-2 aspect-square border rounded-full flex justify-center items-center bg-orange-300 border-slate-300">
                                <p className="text-center text-orange-800">{bet.bet + 1}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <p className="text-slate-600">Odds:</p>
                            <p className="text-center bg-slate-500 text-slate-50 rounded">{`${bet.odds}-1`}</p>
                        </div>
                    </>
                }
                {/* payout */}
                <Payout payout={payout(answer)} />
            </div>
        </div>
    )
}

const Payout = ({ payout }: { payout: Payout }) => {
    return (
        <div className={`py-1 px-2 flex justify-center rounded border ${isNaN(Number(payout)) ? 'bg-red-500 border-red-700' : 'bg-green-500 border-green-700'}`}>
            <p className="text-slate-50 text-sm">{isNaN(Number(payout)) ? payout : `+ ${payout}`}</p>
        </div>
    )
}
