export default function JoinLink({ id }: { id: string }) {
    const link = `localhost:3000/game?joinId=${id}`
    const copyLink = () => {
        navigator.clipboard.writeText(link);
    };

    return (
        <div className="py-2 px-4 border-slate-800 bg-slate-700 text-slate-50 rounded-md flex justify-between items-center">
            <p>
                {link}
            </p>
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-2"
                onClick={copyLink}
            >
                copy
            </button>
        </div>
    );
}