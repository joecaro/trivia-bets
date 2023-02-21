import { useGame } from "../../context/gameContext";

export default function GameSettings() {
    const { stage } = useGame();
    return (
        <>
            {
                stage ? (
                    <div className='col-start-4 py-2 px-4 bg-slate-200 border-slate-400  text-slate-700 rounded-md flex justify-center items-center w-fit'>
                        <p className="font-bold">
                            Stage: {stage}
                        </p>
                    </div>
                ) : null
            }</>
    );
}