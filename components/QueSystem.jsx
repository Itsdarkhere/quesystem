'use client'
import { useState } from "react"
import Que from "./Que"
import Redirecting from "./Redirecting"

export default function QueSystem() {
    const [queing, setQueing] = useState(true);

    return (
        <div className="">
            {queing ? <Que setQueing={setQueing} /> : <Redirecting />}
        </div>
    )
}