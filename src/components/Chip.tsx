export default function Chip({num}: { num: number }) {
    return (
        <div className="w-8 h-8 rounded-full bg-orange-300 border-2 border-slate-100 relative shadow-md">
            <div className="w-8 h-8 rounded-full bg-orange-300 border-2 border-slate-100 absolute flex justify-center items-center" style={{left: '-2px', bottom: '1px'}}>
                <p className="text-orange-800 text-sm font-bold">{num}</p>
            </div>
        </div>
    );
}