'use client';

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: any) {
  useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (
    <div className="p-4">
      <div className="text-sm">
        <strong className="font-bold">Error:</strong> {error?.message}
        <p>New Game?</p>
        <button
         onClick={() => {
          localStorage.clear();
         }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {!!localStorage.getItem('gameId') ? 'Reset Game' : '✔️'}
        </button>
      </div>
    </div>
  );
}
