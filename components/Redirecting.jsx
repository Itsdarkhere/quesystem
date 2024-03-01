'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react";
export default function Redirecting() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/buy");
        }, 2000)
    }, [])

    return (
        <div className=" p-10 bg-zinc-800 rounded-md flex flex-col justify-center items-center">
            <h2>Redirecting...</h2>
        </div>
    )
}