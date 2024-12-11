"use server"
import prisma from "@/lib/prisma";

export default async function registerMessage(chatId: string, content: string, userId: string, isChatResponse?: boolean) {
    if(!isChatResponse) return await prisma.message.create({ data: {chatId: chatId, userId: userId, content: content, date: new Date()} })
    else return await prisma.message.create({ data: {chatId: chatId, userId: process.env.CHAT_ID as string, content: content, date: new Date()} })
}