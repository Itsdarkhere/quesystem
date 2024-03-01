
export default async function Buy() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h2>You can now buy these tickets</h2>
            <div className="w-full mt-10 max-w-md flex flex-col gap-4">
                <button className="p-8 cursor-pointer active:scale-95 w-full rounded-md bg-zinc-600"></button>
                <button className="p-8 cursor-pointer active:scale-95 w-full rounded-md bg-zinc-600"></button>
                <button className="p-8 cursor-pointer active:scale-95 w-full rounded-md bg-zinc-600"></button>
            </div>
        </div>
    )
}