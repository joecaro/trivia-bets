'use client'

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { ReactNode } from 'react';

export default function DragProvider({ children }: { children: ReactNode }) {
    return (
        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>
    );
}