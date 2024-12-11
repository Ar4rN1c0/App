import getUserInfo from "@/Actions/getUserInfo"
import { Chat, User } from "@prisma/client"
import Link from "next/link"

export default async function DashboardPage({ params }: { params: { userName: string } }) {
    const userInfo = await getUserInfo() as unknown as User & { chats: Chat[] }
    return (
        <main className="pt-[80px] grid place-content-center w-[100vw] h-[100vh]">
            <section className="w-[80vw] h-[80vh] bg-gray-200 p-10 rounded-3xl grid gap-2 grid-rows-titlecontent">
                <h1 className="text-3xl font-black text-black">
                    {userInfo.name} {userInfo.surname}
                </h1>
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Your chats
                    </h2>
                    <ul className="list-none text-black pl-9 pt-5 flex flex-col gap-3">
                        {userInfo?.chats.map(chat => (
                            <li className="flex felx-row justify-between w-full" key={chat.id}>
                                <Link className="h-[36px] grid place-content-center text-left" href={"/dashboard/" + params.userName + "/chat/" + chat.id}>
                                    {chat.title}
                                </Link>
                                <Link className="text-right bg-[#4d9e83] p-1 rounded-full" href={"/dashboard/" + params.userName + "/chat/" + chat.id}>
                                    Go to chat
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </main>
    )
}
