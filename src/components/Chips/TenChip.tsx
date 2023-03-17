import TenSvg from "./10";

export default function TenChip({ num, idx }: { num: number, idx: number }) {
    return (
        <div className={`w-8 h-8 rounded-full bg-blue-600 border border-blue-100 relative ${idx === 0 ? 'ao-shadow' : 'shadow-md'
} `}>
            <div className="w-8 h-8 rounded-full bg-blue-600 border border-blue-100 absolute flex justify-center items-center" style={{left: '-1px', bottom: '1px'}}>
               <TenSvg />
               <span className='absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full px-1'>{idx + 1}</span>
            </div>
        </div>
    );
}