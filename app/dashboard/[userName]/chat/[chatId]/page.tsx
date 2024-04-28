import getChatInfo from "@/Actions/getChatInfo"
import getChatMessages from "@/Actions/getChatMessages"
import getUserInfo from "@/Actions/getUserInfo"
import MessagesDisplay from "@/app/components/MessagesDisplay"
import { Chat, Message, User } from "@prisma/client"

export default async function ChatPage({ params }: { params: { userName: string, chatId: string } }) {
    const messages = await getChatMessages(params.chatId) as Message[]
    const chatInfo = await getChatInfo(params.chatId) as Chat
    const user = await getUserInfo() as unknown as User 
    return (
        <main className="max-w-screen min-h-headerless flex flex-col justify-around p-6 align-middle place-items-center">
            <MessagesDisplay chat={chatInfo} messages={messages} user={user}></MessagesDisplay>
        </main>
    )
}