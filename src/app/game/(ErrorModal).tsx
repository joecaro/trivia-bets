import useGame, { dismissError } from "../../zustand/gameStore";

export default function ErrorModal() {
    const error = useGame(state => state.error);
    const reset = useGame(state => state.reset);

    const dismissAndReload = () => {
        reset();
        window.location.replace('/');
    }

    return (
        <>
            {
                !!error ? (
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-900 bg-opacity-40' >
                        <div>
                            <button onClick={dismissError} className="absolute top-0 right-0 p-2 text-slate-50 hover:text-slate-400">X</button>
                        </div>
                        <div className='bg-white p-5 rounded-md shadow-md flex flex-col gap-2'>
                            <p>{error}</p>
                            <button className="px-2 py-1 bg-slate-600 text-white rounded hover:bg-slate-400" onClick={dismissAndReload}>Return to safety</button>
                        </div>
                    </div>
                ) : null

            }
        </>
    )
}