type ChipColor = 'white' | 'blue' | 'green' | 'red' | 'black';

export default function Chip({ color, num, idx }: { color: ChipColor, num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-${color}-300 border border-${color}-400 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className={`w-8 h-8 rounded-full ${color ? `bg-${color}-300` : ''} border border-slate-400 absolute flex justify-center items-center`} style={{left: '-1px', bottom: '1px'}}>
                <p className={`text-${color}-800 text-sm font-bold`}>{num}</p>
            </div>
        </div>
    );
}