'use client'
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';


export default function Home() {

  const addToQue = async () => {
    const response = await fetch('/api/addtoque', {
      method: 'POST',
      body: JSON.stringify({ userId: uuidv4() }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    console.log(response);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <Link href="/que" className=" px-8 py-3 bg-blue-800 text-white font-semibold rounded-md">Buy tickets</Link>
      <button onClick={addToQue} className=" px-8 py-3 bg-red-500 text-white font-semibold rounded-md">Add to que</button>
    </main>
  );
}
