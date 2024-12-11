"use server"

import { revalidatePath } from "next/cache"
import getUserInfo from "./getUserInfo"
import registerMessage from "./registerMessage"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { useId } from "react"


type ChatResponse = {
    generated_text: string
}
export default async function publish(content: FormData) {
    //Get headers and session
    const headerList = headers()
    const user = await getUserInfo()
    if(!user) redirect("/login")
    const userId = user?.id
    
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
        const title = `${message.substring(0,20)}`
        
        await prisma.chat.update({ where: { id: chatId }, data: { title: title } })
    }

    //register the message and register the chat's response
    const userMessage = await registerMessage(chatId, formattedMessage, userId)
    // const chatResponse = await fetch("http://localhost:3000/api/v1/chat", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         message: message,
    //         messages: messageList
    //     })
    // }).then(res => res.json()) as string 

    let chatResponse

    const data = { Message: userMessage.content };

    chatResponse = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    let chatText = chatResponse[0].generated_text as string 

    if(userMessage.content.length > 300) chatText = "Qué Guay"
    if(!chatText) chatResponse = "Failed"
    registerMessage(chatId, chatText, userId, true)

    revalidatePath(headerList.get("referer") as string)
}