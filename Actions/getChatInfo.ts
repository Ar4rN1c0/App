"use server"
import prisma from "@/lib/prisma"

export default async function getChatInfo(chatId: string) {
    const chat = prisma.chat.findUnique({ where: {id: chatId} })
    return chat
}