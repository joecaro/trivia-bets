import { useDrag } from 'react-dnd'

export default function Token({token, index}: {token: string, index: number}) {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'token',
        item: { idx: index },
    }))

    return (
        collected.isDragging ? (
            <div ref={dragPreview} className="w-12 h-12 rounded-full bg-blue-300 border-2 border-blue-100 relative">
                <div className="w-12 h-12 rounded-full bg-blue-300 border-2 border-blue-100 absolute flex justify-center items-center" style={{ left: '-2px', bottom: '2px' }}>
                    <p className="text-slate-800 text-lg">TB</p>
                </div>
            </div>
        ) : (
            <div ref={drag} className="w-12 h-12 rounded-full bg-blue-300 border-2 border-blue-100 relative shadow-md ao-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-300 border-2 border-blue-100 absolute flex justify-center items-center" style={{ left: '-2px', bottom: '2px' }}>
                    <p className="text-slate-800 text-lg">TB</p>
                </div>
            </div>
        )

    );
}