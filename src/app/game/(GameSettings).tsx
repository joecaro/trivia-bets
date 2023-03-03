import { useSocket } from "../../context/socketContext";
import useGameStore from "../../zustand/gameStore";

export default function GameSettings() {
    const users = useGameStore((state) => state.users);
    const stage = useGameStore((state) => state.stage);
    const { socket, destroyGame } = useSocket();

    const isHost = users && users[0] && users[0].id === socket.id;

    return (
        <>
            {
                stage ? (
                    <div className='col-start-4 py-2 px-4 bg-slate-200 border-slate-400  text-slate-700 rounded-md flex justify-center items-center w-fit'>
                        <p className="font-bold">
                            Stage: {stage}
                        </p>
                        {isHost ? (
                            <button onClick={destroyGame} className="ml-2 px-2 py-1 bg-slate-400 text-slate-100 rounded-md">
                                Destroy Game
                            </button>
                        ) : null
                        }
                    </div>
                ) : null
            }</>
    );
}