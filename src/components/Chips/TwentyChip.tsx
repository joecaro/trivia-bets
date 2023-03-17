import TwentySvg from "./20";

export default function TwentyChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-green-700 border border-green-100 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-green-700 border border-green-100 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
               <TwentySvg />
               <span className='absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full px-1'>{idx + 1}</span>
            </div>
        </div>
    );
}