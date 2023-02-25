import { useRef } from "react"
import { Chips } from "../lib/types";
import FiftyChip from "./Chips/FifityChip";
import FiveChip from "./Chips/FiveChip";
import OneChip from "./Chips/OneChip";
import TenChip from "./Chips/TenChip";
import TwentyChip from "./Chips/TwentyChip";

const chipComponents = {
    one: OneChip,
    five: FiveChip,
    ten: TenChip,
    twenty: TwentyChip,
    fifty: FiftyChip
}

const chipDisplay = {
    one: 1,
    five: 5,
    ten: 10,
    twenty: 20,
    fifty: 50,
}

export default function ChipStack({ chips, type }: { chips: number, type: keyof Chips }) {
    const randomId = useRef(Math.round(Math.random() * 1000)).current;

    const Chip = chipComponents[type];

    if (chips === 0) return null;

    return (
        <div className="relative h-10 w-8">
            {
                Array(Math.min(chips, 10)).fill(0).map((_, i) => {
                    return (
                        <div style={{ position: 'absolute', left: 0, bottom: `${Math.min(i * 2, 15)}px` }} key={`${randomId}-${i}`}>
                            <Chip num={chipDisplay[type] * (i + 1)} idx={i} />
                        </div>
                    )
                })
            }
        </div>
    )
}