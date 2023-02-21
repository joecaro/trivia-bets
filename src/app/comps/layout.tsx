'use client'

import DragProvider from "../../context/DndContext";


export default function GamePage({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <DragProvider>
            {children}
        </DragProvider>
    )
}