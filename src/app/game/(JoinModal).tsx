import { FormEvent, useState } from "react"
import { SocketContextProps, useSocket } from "../../context/socketContext"
import { setIsSpectating } from "../../zustand/gameStore"

const me = {
    name: 'Player 1',
    id: 'player1',
}
export default function JoinModal({ show, onCreate, onJoin, onClose, joinId }
    : {
        show: boolean,
        onCreate: SocketContextProps['create'],
        onJoin: SocketContextProps['register'],
        onClose: () => void
        joinId: string | null
    }) {
    const [name, setName] = useState(me.name)
    const { spectate } = useSocket();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (joinId) {
            onJoin(name, joinId)
        } else {
            onCreate(name)
        }

        onClose()
    }

    const onSpectate = () => {
        if (joinId) {
            spectate(joinId)
            setIsSpectating(true)
        }
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 ${show ? '' : 'hidden'}`}>
            <div>
                <button className='absolute top-0 right-0 m-2' onClick={onClose}>X</button>
            </div>
            <form onSubmit={onSubmit} className='bg-white p-5 rounded'>
                <div className="flex justify-end">
                    {joinId && <button disabled className="px-2 py-1 bg-slate-500 text-white" onClick={onSpectate}>Just Spectate</button>}
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='name'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        {joinId ? 'Join' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    )
}