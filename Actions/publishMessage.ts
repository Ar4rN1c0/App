"use server"

import { revalidatePath } from "next/cache"
import getUserInfo from "./getUserInfo"
import registerMessage from "./registerMessage"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function publish(content: FormData) {
    //Get headers and session
    const headerList = headers()
    const user = await getUserInfo()
    if(!user) redirect("/login")

    //Get the chatId from the url the user is making the request
    const url = headerList.get("referer") as string
    const match = url.split("/")
    const chatId = match[match.indexOf("chat") + 1]

    //get the messages from the chat
    const messages = await prisma.message.findMany({where: {chatId: chatId}})
    const messageList = messages.map(message => ({
        role: message.userId === "machinebotid" ? "assistant" : "user",
        content: message.content
    }))
    //Extract the content of the message
    const message = content.get("text") as string
    const formattedMessage = message.replaceAll("\n", "<<br/>>")

    //if the message is the first one, set the title to the first chars of the message
    if (messages.length === 0) {
        const titleRsponse = await fetch("http://chatapi.4r4rn1co.xyz/api/sumarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        })
        const title = await titleRsponse.json() as {any: any, response: string}

        
        await prisma.chat.update({ where: { id: chatId }, data: { title: title.response } })
    }

    //register the message and register the chat's response
    const userMessage = await registerMessage(chatId, formattedMessage, user?.id as string)
    const chatResponse = await fetch("http://chatapi.4r4rn1co.xyz/api/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message,
            messageList: messageList
        })
    }).then(res => res.json()) as string
    registerMessage(chatId, chatResponse, user?.id as string, true)

    revalidatePath(headerList.get("referer") as string)
}