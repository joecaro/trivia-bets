import { useSocket } from "../../context/socketContext";
import useGameStore from "../../zustand/gameStore";
import JoinLink from "./(JoinLink)";

export default function LeftCorner() {
    const users = useGameStore((state) => state.users);
    const stage = useGameStore((state) => state.stage);
    const currentQuestionIndex = useGameStore((state) => state.currentQuestionIndex);
    const questions = useGameStore((state) => state.questions);
    const { socket, destroyGame } = useSocket();

    const isHost = users && users[0] && users[0].id === socket.id;
    return (
        <>
            {
                stage ? (
                    <div className='col-start-4 py-2 px-4 bg-slate-200 border-slate-400  text-slate-700 rounded-md flex flex-wrap justify-center items-center w-fit'>
                        <JoinLink />
                        {isHost ? (
                            <button onClick={destroyGame} className="ml-2 px-2 py-1 bg-slate-400 text-slate-100 rounded-md">
                                Destroy Game
                            </button>
                        ) : null
                        }
                        {stage === 'bets' || stage === 'betResults' || stage === 'tally' ? (
                            <div className="my-2 font-bold w-full p-2 border border-slate-600 rounded">
                                <p>{questions[currentQuestionIndex].question}</p>
                            </div>
                        ) : null}
                    </div>
                ) : null
            }</>
    )
}