export default function FiveChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-red-300 border border-red-400 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-red-300 border border-red-400 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
                <p className="text-red-900 text-sm font-bold">{num}</p>
            </div>
        </div>
    );
}