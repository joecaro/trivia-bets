import { Ref } from 'react';
import { useDrag } from 'react-dnd'
import OneSvg from './Chips/1';

export default function Token({token, index}: {token: string, index: number}) {
    const [collected, drag, dragPreview]: [{isDragging: boolean}, Ref<HTMLElement>, Ref<HTMLElement>] = useDrag(() => ({
        type: 'token',
        item: { idx: index },
    }))

    return (
        collected.isDragging ? (
            <div ref={dragPreview} className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-50 relative shadow-md ao-shadow">
                <OneSvg />
            </div>
        ) : (
            <div ref={drag} className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-50 relative shadow-md ao-shadow">
                <OneSvg />
            </div>
        )

    );
}