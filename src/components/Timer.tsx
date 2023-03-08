import { useTimer } from "../context/timerContext";

export default function Timer() {
  const { timer } = useTimer();

  return <TimerBar timer={timer} />;
}

export function TimerBar({ timer }: { timer: number | null }) {
    const percent =  timer && timer < 30 ? 100 - (timer / 30) * 100 : 0;
    
  return (
    <div className="h-6 w-96 bg-slate-400 border rounded relative">
      <div
        className="bg-blue-500 h-6 rounded"
        style={{ width: `${percent}%` }}
      >
      </div>
      <div
        className="py-1 px-2 rounded bg-slate-500 text-slate-50 w-fit absolute top-1/2"
        style={{ transform: `translate(-50%, -50%)`, left: `${percent}%`, transition: '300ms'}}
      >
        {timer ? `⏲ ${timer}s left` : "..."}
      </div>
    </div>
  );
}
