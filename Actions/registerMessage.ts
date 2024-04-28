"use server"
import prisma from "@/lib/prisma";

export default async function registerMessage(chatId: string, content: string, userId: string) {
    await prisma.message.create({ data: {chatId: chatId, userId: userId, content: content, date: new Date()} })
}