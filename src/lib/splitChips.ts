import { Chips } from "./types";

const CHIPS: number[] = [
    50,
    20,
    10,
    5,
]

const chipNameMap = {
    50: 'fifty',
    20: 'twenty',
    10: 'ten',
    5: 'five',
    1: 'one',
}

export default function splitChipsIntoGroups(chips: number): Chips {
    let remainder = chips
    const chipsGroups = {
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        one: 0,
    }

    for (const chip of CHIPS) {
        while (remainder >= chip) {
            chipsGroups[chipNameMap[chip as keyof typeof chipNameMap] as keyof typeof chipsGroups] += 1;
            remainder -= chip;
        }
    }

    if (remainder > 0) {
        chipsGroups.one = remainder
    }

    return chipsGroups;
}