import { useGame } from "../../context/gameContext"

export default function ErrorModal() {
    const { error, dismissError } = useGame()

    const handleClick = () => {
        dismissError();
    }

    return (
        <>
            {
                !!error ? (
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center' >
                        <div className='bg-white p-5 rounded-md shadow-md'>
                            <p>{error}</p>
                            <button onClick={dismissError}>Return to safety</button>
                        </div>
                    </div>
                ) : null

            }
        </>
    )
}