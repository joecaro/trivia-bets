export default function OneChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-slate-300 border border-slate-400 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-slate-300 border border-slate-400 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
                <p className="text-slate-900 text-sm font-bold">{num}</p>
            </div>
        </div>
    );
}