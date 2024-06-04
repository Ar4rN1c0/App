import NextAuth from "next-auth";
import Credentials, { CredentialsProvider } from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({where: {
                    email: credentials?.email
                }})
                if(user && user.id !== "machinebotid") {
                    const isValidpassword = await compare(credentials?.password || "", user.password)
                    if(isValidpassword) return { email: user.email, name: user.id, id: user.id }
                    else return null
                } else return null
            }
        })
    ]
})

export {handler as GET, handler as POST}