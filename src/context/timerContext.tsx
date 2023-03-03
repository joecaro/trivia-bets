"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSocket } from "./socketContext";



const TimerContext = createContext<{timer: number | null}>({ timer: null })

const TimerProvider = ({ children }: { children: ReactNode }) => {
    const [timer, setTimer] = useState<number | null>(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('timer', (seconds: number) => {
                setTimer(seconds);
            })
        }
    }, [socket])

    return (
        <TimerContext.Provider value={{ timer }}>
            {children}
        </TimerContext.Provider>
    )
}

export const useTimer = () => {
    return useContext(TimerContext);
}

export default TimerProvider;
