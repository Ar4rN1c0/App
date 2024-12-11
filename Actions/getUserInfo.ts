"use server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";

export default async function getUserInfo() {
    const session = await getServerSession();
    if(session) {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.name as string
            },
            select: {
                id: true,
                name: true,
                surname: true,
                userName: true,
                email: true,
                chats: {
                    include: {
                        author: true,
                        messages: true
                    }
                },
                messages: true,
                createdAt: true
            }
        })
        return user
    }
    else return false
}