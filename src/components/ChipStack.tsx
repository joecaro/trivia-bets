import { useRef } from "react"
import Chip from "./Chip"

export default function ChipStack({ chips }: { chips: number }) {
    const randomId = useRef(Math.round(Math.random() * 1000))
    return (
        <div className="relative h-14 w-8">
            {
                Array(chips).fill(0).map((_, i) => {
                    return (
                        <div style={{position: 'absolute', left: 0, bottom: `${Math.min(i * 2, 15)}px`}} key={`${randomId}-${i}`}>
                            <Chip num={i+1} />
                        </div>
                    )
                })
            }
        </div>
    )
}