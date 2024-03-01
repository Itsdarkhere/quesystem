'use client'
import { addToQue, getQueSize, popFromQue } from "../utils/utils";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [queueSize, setQueueSize] = useState(0);

  const getSet = () => {
    const response = getQueSize();
    setQueueSize(response);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <Link href="/que" className=" px-8 py-3 bg-blue-800 text-white font-semibold rounded-md">Buy tickets</Link>
      <button onClick={() => addToQue()} className=" px-8 py-3 bg-green-500 text-white font-semibold rounded-md active:scale-95">Add to que</button>
      <button onClick={() => popFromQue()} className=" px-8 py-3 bg-red-500 text-white font-semibold rounded-md active:scale-95">Pop from que</button>
      <button onClick={() => getSet()} className=" px-8 py-3 bg-yellow-500 text-white font-semibold rounded-md active:scale-95">getQueSize</button>
      <h2>Queue size: {queueSize}</h2>
    </main>
  );
}
