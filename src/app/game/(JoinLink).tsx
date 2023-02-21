import { useState } from "react";
import { useGame } from "../../context/gameContext";
import { socketIp } from "../../context/socketContext";

export default function JoinLink() {
    const { gameId: id } = useGame();
    const [copied, setCopied] = useState(false);

    const link = `${socketIp}:3000/game?joinId=${id}`
    const copyLink = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);

        setTimeout(() => { setCopied(false) }, 2000);
    };

    return (
        <>
            {
                id ? (
                    <div className="py-2 px-4 bg-slate-200 border-slate-400  text-slate-700 rounded-md flex justify-center items-center w-fit">
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={copyLink}
                        >
                            {copied ? 'Copied' : '📋 Join Link'}
                        </button>
                    </div>
                ) : null
            }</>
    );
}