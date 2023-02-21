"use client"

import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GameState } from "../lib/types";

export const socketIp = '192.168.0.245'

type STCEventMap = {
    'gameState': (state: GameState) => void,
    'noReconnect': () => void,
    'id': (id: string) => void,
}

type CTSEventMap = {
    'create': (user: string) => void,
    'register': (user: string, gameId: string) => void,
    'reconnect': (id: string, gameId: string) => void,
    'unregister': () => void,
    'start': () => void,
    'submitAnswer': (answer: string) => void,
    'bet': (answer: string, payout: number, betIdx:  number) => void,
    'betChip': (betIdx: number, amount: number) => void,
}

const socket = io(socketIp + ':8080');


const SocketContext = createContext<{
    socket: Socket<STCEventMap, CTSEventMap>,
    storeGame: (gameId: string) => void
}>({ socket: socket, storeGame: () => { } })

const SocketProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();

    const storeGame = useCallback((gameId: string) => {
        console.log('storing game');
        console.log('gameId', gameId);

        localStorage.setItem('gameId', JSON.stringify({ gameId, id: socket.id}));
    }, [])

    const retrieveGame = useCallback(() => {
        const storedGame = localStorage.getItem('gameId');

        if (storedGame) {
            console.log('retrieving game');
            const { gameId, id } = JSON.parse(storedGame);

            console.log({storedGame, gameId, id});
            
            
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
