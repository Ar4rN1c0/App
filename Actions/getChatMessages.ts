"use server"
import prisma from "@/lib/prisma"

export default async function getChatMessages(chatId: string) {
    const messages = await prisma.message.findMany({where: {chatId: chatId}})
    return messages
}