import getUserInfo from "@/Actions/getUserInfo"
import { Chat, User } from "@prisma/client"
import Link from "next/link"

export default async function DashboardPage({ params }: { params: { userName: string } }) {
    const userInfo = await getUserInfo() as unknown as User & {chats: Chat[]}
    return (
        <main className="pt-[80px]">
            <h1>
                {params.userName}
            </h1>
            <section>
                {userInfo?.chats.map(chat => (
                    <li key={chat.id}><Link href={"/dashboard/" + params.userName + "/chat/" + chat.id}>{chat.title}</Link></li>
                ))}
            </section>
        </main>
    )
}