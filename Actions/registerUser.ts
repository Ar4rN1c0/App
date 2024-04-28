import prisma from "@/lib/prisma";
import {hash} from 'bcrypt'
import { redirect } from "next/navigation";

export default async function registerUser(data: FormData) {
    "use server"
    const existingEmail = await prisma.user.findUnique({where: {email: data.get("email") as string}})
    if(!existingEmail) {
        await prisma.user.create({
            data: {
                name: data.get("name") as string,
                surname: data.get('surname') as string,
                password: await hash(data.get('password') as string, 10) as unknown as string,
                userName: (await hash(data.get('name') as string, 1)).slice(0,10).replaceAll("/", "-") as  unknown as string,
                createdAt: new Date(),
                updatedAt: new Date(),
                email: data.get("email") as string
            }
        }).then(res => {
            redirect("/login")
        })
    }
}