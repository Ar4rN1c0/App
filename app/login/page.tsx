"use client"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Spinner from "../components/Spinner";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string>()
    const [isSending, setIsSending] = useState<boolean>(false)
    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const res = await signIn('credentials', {
            email: data.get("email") as string,
            password: data.get('password') as string,
            redirect: false,
            callbackUrl: "/"
        })
        if (res?.ok) {
            router.push("/")
            router.refresh()
        }
        else if (Math.floor(res?.status as number / 100) === 5) {
            setError("Internal server error. It is not your fault, we'll be back soon")
            setIsSending(false)
        } else if (Math.floor(res?.status as number / 100) === 4) {
            setError("Either wrong password or email")
            setIsSending(false)
        }
    }

    return (
        <main className="grid place-content-center min-h-headerless p-10 gap-3">
            {error && (
                <div className="bg-red-400 animate-appear flex gap-4 jusitfy-around text-white w-fit p-3 m-auto rounded-md  absolute left-center translate-x-center top-[30vh]">
                    <p>{error}</p>
                    <button onClick={() => setError("")}>&#10006;</button>
                </div>
            )}
            {isSending && <Spinner></Spinner>}
            <form onSubmit={(e) =>  {
                setIsSending(true)
                login(e)
            }} className="flex flex-col gap-4 [&>*]:rounded-md bg-slate-400 p-10 rounded-lg">
                <input className="p-1 color-black bg-slate-800 focus:bg-slate-300 focus:text-black" required type="email" name="email"/>
                <input className="p-1 color-black bg-slate-800 focus:bg-slate-300 focus:text-black" required type="password" name="password"/>
                <button disabled={isSending} className="bg-sky-800 color-white py-2" type="submit">Submit!</button>
            </form>

        </main>
    )
}