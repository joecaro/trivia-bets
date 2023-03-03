import useGame from "../../zustand/gameStore";

export default function ErrorModal() {
    const error = useGame(state => state.error);
    const reset = useGame(state => state.reset);

    const dismissError = () => {
        reset();
        window.location.replace('/');
    }

    return (
        <>
            {
                !!error ? (
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-900 bg-opacity-40' >
                        <div className='bg-white p-5 rounded-md shadow-md flex flex-col gap-2'>
                            <p>{error}</p>
                            <button className="px-2 py-1 bg-slate-600 text-white rounded hover:bg-slate-400" onClick={dismissError}>Return to safety</button>
                        </div>
                    </div>
                ) : null

            }
        </>
    )
}