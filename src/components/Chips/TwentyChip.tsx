export default function TwentyChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-green-300 border border-green-400 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-green-300 border border-green-400 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
                <p className="text-green-900 text-sm font-bold">{num}</p>
            </div>
        </div>
    );
}