import { useState } from "react";
import useGameStore from "../../zustand/gameStore";
import { socketIp } from "../../context/socketContext";

export default function JoinLink() {
    const id = useGameStore(state => state.gameId)
    const [copied, setCopied] = useState(false);

    const link = `https://triviabets.vercel.app/game?joinId=${id}`
    const copyLink = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);

        setTimeout(() => { setCopied(false) }, 2000);
    };

    return (
        <>
            {
                id ? (
                    <div className=" border-slate-400 rounded-md flex justify-center items-center w-fit">
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={copyLink}
                        >
                            {copied ? 'Copied' : '📋 Join Link'}
                        </button>
                    </div>
                ) : null
            }</>
    );
}