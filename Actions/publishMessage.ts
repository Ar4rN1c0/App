"use server"

import { revalidatePath } from "next/cache"
import getUserInfo from "./getUserInfo"
import registerMessage from "./registerMessage"
import { headers } from "next/headers"

export default async function publish(content: FormData) {
    const headerList = headers()
    const user = await getUserInfo() 
    const url = headerList.get("referer") as string
    const match = url.split("/")
    const chatId = match[match.indexOf("chat") + 1]
    const message = content.get("text") as string
    const formattedMessage = message.replaceAll("\n", "<<br/>>")
    console.log(formattedMessage.split(""))
    await registerMessage(chatId, formattedMessage, user?.id as string)
    revalidatePath(headerList.get("referer") as string)
}