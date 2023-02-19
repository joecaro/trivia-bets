
type PlayerProps = {
    name: string,
    image: string,
    score: number,
}

export default function Player({
    name,
    image,
    score,
}: PlayerProps) {
    return (
        <div className="flex flex-col items-center w-16">
            <div className="w-16 h-16 rounded-full bg-slate-300 flex justify-center items-center">
                <p className="text-slate-600 text-lg">:)</p>
            </div>
            <p>{name}</p>
        </div>
    );
}