import FiftySvg from "./50";

export default function FiftyChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-purple-900 border border-purple-100 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-purple-900 border border-purple-100 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
                <FiftySvg />
                <span className='absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full px-1'>{num}</span>
            </div>
        </div>
    );
}