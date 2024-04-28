import LogoutButton from "./logout"
import Link from "next/link"
import getUserInfo from "@/Actions/getUserInfo"

export default async function Header() {
    const session = await getUserInfo()
    return (
        <header className="h-header bg-slate-500 grid place-content-center">
            <nav className="flex  gap-5 jusitfy-around w-full p-3 [&>*]:p-2 [&>*]:rounded-lg ">
                <Link className="duration-md hover:bg-slate-400" href="/">Home</Link>
                <Link className="duration-md hover:bg-slate-400" href="/dashboard/new-chat">New Chat</Link>
                <Link className="duration-md hover:bg-slate-400" href={"/dashboard"}>Your Chats</Link>
                <Link className="duration-md hover:bg-slate-400" href="/login">Login</Link>
                <LogoutButton></LogoutButton>
            </nav>
        </header>
    )
}