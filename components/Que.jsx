'use client'
import { useState, useEffect } from "react";
import { addToQue, getQueSize, popFromQue } from "../utils/utils";
import { useRouter } from "next/navigation";

export default function Que({ setQueing }) {
    let userId = null;
    const router = useRouter();
    const [quePosition, setQuePosition] = useState(null);

    // Get que size
    useEffect(() => {
        const getPosition = async () => {
            const response = await getQueSize();
            setQuePosition(response);
        }
        
        getPosition();
        const interval = setInterval(async () => {
            getPosition();
        }, 5000);

        return () => clearInterval(interval);
    }, [])

    // add the current user to the que
    useEffect(() => {
        const addUserToQue = async () => {
            userId = await addToQue();
        }

        addUserToQue();
    }, [])

    // Check every x seconds if the user's ID matches the ID popped from the queue
    useEffect(() => {
        const interval = setInterval(async () => {
            const poppedUserId = await popFromQue();
            if (poppedUserId === userId) {
                setQueing(false);
            }
        }, 1500);

        return () => clearInterval(interval); // Cleanup the interval on component unmount or userId change
    }, []);

    return (
        <div className=" p-10 bg-zinc-800 rounded-md flex flex-col justify-center items-center">
            {quePosition && <h2>Your position is: {quePosition}</h2>}
            <span className="loading loading-bars loading-lg"></span>
        </div>
    )
}