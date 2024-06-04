import getChatInfo from "@/Actions/getChatInfo"
import getChatMessages from "@/Actions/getChatMessages"
import getUserInfo from "@/Actions/getUserInfo"
import MessagesDisplay from "@/app/components/MessagesDisplay"
import { Chat, Message, User } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function ChatPage({ params }: { params: { userName: string, chatId: string } }) {
    const messages = await getChatMessages(params.chatId) as Message[]
    const chatInfo = await getChatInfo(params.chatId) as Chat
    const user = await getUserInfo() as unknown as User
    if (!chatInfo) redirect("/dashboard/" + user.userName as string)
    return (
        <main className="max-w-screen grid place-content-center py-[80px] gap-10">
            <MessagesDisplay chat={chatInfo} messages={messages} user={user}></MessagesDisplay>
        </main>
    )
}