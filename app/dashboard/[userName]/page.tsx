import getUserInfo from "@/Actions/getUserInfo"
import Link from "next/link"

export default async function DashboardPage({ params }: { params: { userName: string } }) {
    const userInfo = await getUserInfo()
    return(
        <>
            <h1>
                {params.userName}
            </h1>
            <section>
                {userInfo?.chats.map(chat => (
                    <li key={chat.id}><Link href={"/dashboard/" + params.userName + "/chat/" + chat.id}>{chat.title}</Link></li>
                ))}
            </section>
        </>
    )
}