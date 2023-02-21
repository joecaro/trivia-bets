type Size = 'fives' | 'tens' | 'twenties' | 'forties';

interface Cutoffs {
    normal: Record<Size, number>;
    condensed: Record<Size, number>;
    values: Record<Size, number>;
}

const cutoffs = {
    normal: {
        fives: 4,
        tens: 4,
        twenties: 4,
        forties: Infinity
    },
    condensed: {
        fives: 1,
        tens: 1,
        twenties: 2,
        forties: Infinity
    },
    values: {
        fives: 5,
        tens: 10,
        twenties: 20,
        forties: 40
    }
}

export default function splitChipsIntoGroups(chips: number, format: 'normal' | 'condensed' = 'normal'): number[] {
    let remainder = chips
    const groups: Record<Size, number[]> = {
        fives: [],
        tens: [],
        twenties: [],
        forties: []
    }

    for (const [groupSize, groupCutoff] of Object.entries(cutoffs[format])) {
        const size = groupSize as Size;
        while (remainder > cutoffs.values[size] && groups[size].length < groupCutoff) {
            groups[size].push(cutoffs.values[size]);
            remainder -= cutoffs.values[size];
        }
    }

    return Object.values(groups).flat().concat(remainder);
}