export default function FiftyChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-purple-800 border border-purple-500 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-purple-800 border border-purple-500 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
                <p className="text-purple-200 text-sm font-bold">{num}</p>
            </div>
        </div>
    );
}