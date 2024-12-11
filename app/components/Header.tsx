import LogoutButton from "./logout"
import Link from "next/link"
import getUserInfo from "@/Actions/getUserInfo"
import { use } from "react"

export default async function Header() {
    const session = await getUserInfo()
    return (
        <header className="h-header bg-[#4d9e83] grid place-content-center fixed w-full z-50">
            <nav className="flex  gap-5 jusitfy-around w-full p-3 [&>*]:p-2 [&>*]:rounded-lg ">
                <Link className="duration-md hover:bg-[aquamarine]" href="/">Home</Link>
                <Link className="duration-md hover:bg-[aquamarine]" href={session ? ("/dashboard/" + session.userName +"/new-chat") : "/login"}>New Chat</Link>
                <Link className="duration-md hover:bg-[aquamarine]" href={session ? ("/dashboard/" + session.userName) : "/login"}>Your Chats</Link>
                {!session && <><Link className="duration-md hover:bg-[aquamarine]" href="/login">Login</Link>
                <Link className="duration-md hover:bg-[aquamarine]" href="/register">Register</Link></>}
                {session && <LogoutButton></LogoutButton>}
            </nav>
        </header>
    )
}