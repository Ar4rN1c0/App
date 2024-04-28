"use server"
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export default async function registerChat() {
    const session = await getServerSession()
    const existingNewChat = await prisma.chat.findUnique({where: {authorId: session?.user.id as string, title: "New Chat"}})
    if(!existingNewChat) await prisma.chat.create({data: {authorId: session?.user.id as string, title: "New Chat"}})
}