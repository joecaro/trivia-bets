import OneSvg from "./1";

export default function OneChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-slate-300 border border-slate-400 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-slate-300 border border-slate-400 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
                <OneSvg />
                <span className='absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full px-1'>{idx + 1}</span>
            </div>
        </div>
    );
}