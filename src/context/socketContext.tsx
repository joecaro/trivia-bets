"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GameState } from "../lib/types";
import { selectiveUpdate, setError, storeGame } from "../zustand/gameStore";

export const socketIp = process.env.NEXT_PUBLIC_WS_URL;

type STCEventMap = {
    'gameState': (state: GameState) => void,
    'noReconnect': () => void,
    'id': (id: string) => void,
    'noGame': () => void,
    'timer': (seconds: number) => void,
}

type CTSEventMap = {
    'create': (user: string) => void,
    'register': (user: string, gameId: string) => void,
    'reconnect': (id: string, gameId: string) => void,
    'unregister': () => void,
    'updateUser': (user: string) => void,
    'nextStage': () => void,
    'submitAnswer': (answer: string) => void,
    'bet': (answer: string, payout: number, betIdx: number) => void,
    'betChip': (betIdx: number, amount: number) => void,
    'newGame': () => void,
    'destroyGame': () => void,
}

export const socket = io(socketIp || 'https://localhost:8080');

export type SocketContextProps = {
    socket: Socket<STCEventMap, CTSEventMap>,
    create: (user: string) => void,
    register: (username: string, gameToJoin: string) => void,
    unregister: () => void,
    nextStage: () => void,
    submitAnswer: (answer: string) => void,
    bet: (answer: string, payout: number, betIdx: number) => void,
    betChip: (betIdx: number, amount: number) => void,
    newGame: () => void,
    destroyGame: () => void,
    spectate: (gameId: string) => void,
    updateUser: (key: string, value: string) => void,
}


const SocketContext = createContext<SocketContextProps>({
    socket: socket,
    create: () => { },
    register: () => { },
    unregister: () => { },
    nextStage: () => { },
    submitAnswer: () => { },
    bet: () => { },
    betChip: () => { },
    newGame: () => { },
    destroyGame: () => { },
    spectate: () => { },
    updateUser: () => { },
})

const SocketProvider = ({ children }: { children: ReactNode }) => {

    const retrieveGame = useCallback(() => {
        const storedGame = localStorage.getItem('gameId');

        if (storedGame) {
            const { gameId, id } = JSON.parse(storedGame);
            socket.emit('reconnect', id, gameId);
        }
    }, [])

    const create = useCallback((user: string) => {
        if (socket) {
            socket.emit('create', user);
        }
    }, [])

    const register = useCallback((username: string, gameToJoin: string) => {
        if (socket) {
            socket.emit('register', username, gameToJoin);
            storeGame(gameToJoin, socket.id)
        }
    }, [])

    const unregister = useCallback(() => {
        if (socket) {
            socket.emit('unregister');
        }
    }, [])

    const nextStage = useCallback(() => {
        if (socket) {
            socket.emit('nextStage')
        }
    }, [])

    const submitAnswer = useCallback((answer: string) => {
        if (socket) {
            socket.emit('submitAnswer', answer)
        }
    }, [])

    const bet = useCallback((answer: string, payout: number, betIdx: number) => {
        if (socket) {
            socket.emit('bet', answer, payout, betIdx)
        }
    }, [])

    const betChip = useCallback((betIdx: number, amount: number = 1) => {

        if (socket) {
            socket.emit('betChip', betIdx, amount)
        }
    }, [])

    const newGame = useCallback(() => {
        socket.emit('newGame');
    }, [])

    const destroyGame = useCallback(() => {
        if (socket) {
            socket.emit('destroyGame');
        }
    }, [])

    const spectate = useCallback(() => {
        if (socket) {
            socket.emit('spectate');
        }
    }, [])
    const updateUser = useCallback((key: string, value: string) => {
        if (socket) {
            socket.emit('updateUser', key, value);
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

    useEffect(() => {

        if (socket) {
            socket.on('gameState', (state) => {
                console.group('gameState event')
                console.log({ state });
                console.groupEnd();
                selectiveUpdate(state, socket.id);
            });
        }

        socket.on('noReconnect', () => {
            console.log('No reconnect');
        });
        
        socket.on('noUserOnConnnect', () => {
            console.log('No user on connect');
        });

        socket.on('noGame', () => {
            setError('No game found');
        });

        return () => {
            if (socket) {
                socket.off('gameState');
            }
        }
    }, []);

    return (
        <SocketContext.Provider value={{
            socket,
            create,
            register,
            unregister,
            nextStage,
            submitAnswer,
            bet,
            betChip,
            newGame,
            destroyGame,
            spectate,
            updateUser,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext);
}

export default SocketProvider;
