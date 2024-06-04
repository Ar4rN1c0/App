import getUserInfo from "@/Actions/getUserInfo"
import registerChat from "@/Actions/registerChat"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function NewChat() {
    const user = await getUserInfo()
    const chat = await prisma.chat.findFirst({where: {authorId: user?.id, title: "New Chat"}})
    if(!chat) {
        await registerChat()
        const newChat = await prisma.chat.findFirst({where: {authorId: user?.id, title: "New Chat"}})
        redirect("/dashboard/" + user?.userName + "/chat/" +newChat?.id)
    }
    else redirect("/dashboard/" + user?.userName + "/chat/" + chat.id)
}