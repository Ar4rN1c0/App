"use server"
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import getUserInfo from "./getUserInfo";

export default async function registerChat() {
    const session = await getServerSession()
    const user = await getUserInfo()
    const existingNewChat = await prisma.chat.findFirst({where: {authorId: user?.id, title: "New Chat"}})
    if(!existingNewChat && session) await prisma.chat.create({data: {authorId: user?.id as string, title: "New Chat"}})
}