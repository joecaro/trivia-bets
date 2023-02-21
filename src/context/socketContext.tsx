"use client"

import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GameState } from "../lib/types";

export const socketIp = process.env.NEXT_PUBLIC_WS_URL;

type STCEventMap = {
    'gameState': (state: GameState) => void,
    'noReconnect': () => void,
    'id': (id: string) => void,
    'noGame': () => void,
}

type CTSEventMap = {
    'create': (user: string) => void,
    'register': (user: string, gameId: string) => void,
    'reconnect': (id: string, gameId: string) => void,
    'unregister': () => void,
    'nextStage': () => void,
    'submitAnswer': (answer: string) => void,
    'bet': (answer: string, payout: number, betIdx:  number) => void,
    'betChip': (betIdx: number, amount: number) => void,
    'newGame': () => void,
}

const socket = io(socketIp || 'http://localhost:8080');


const SocketContext = createContext<{
    socket: Socket<STCEventMap, CTSEventMap>,
    storeGame: (gameId: string) => void
}>({ socket: socket, storeGame: () => { } })

const SocketProvider = ({ children }: { children: ReactNode }) => {
    const storeGame = useCallback((gameId: string) => {
        localStorage.setItem('gameId', JSON.stringify({ gameId, id: socket.id}));
    }, [])

    const retrieveGame = useCallback(() => {
        const storedGame = localStorage.getItem('gameId');

        if (storedGame) {
            const { gameId, id } = JSON.parse(storedGame);
            socket.emit('reconnect', id, gameId);
        }
    }, [])

    useEffect(() => {
        if (socket) {
            retrieveGame();

            socket.on('error', (error: string) => {
                alert(error);
            })
        }

        return () => {
            if (socket) {
                socket.off('error');
            }
        }
    }, [retrieveGame])

    return (
        <SocketContext.Provider value={{ socket, storeGame }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext);
}

export default SocketProvider;
