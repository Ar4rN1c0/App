import getUserInfo from "@/Actions/getUserInfo"
import {redirect} from "next/navigation"
import type {Session} from "@/types/app-types"
export default async function DashboardPage() {
    const session = await getUserInfo()
    redirect("/dashboard/" + (session?.userName ? session?.userName: "not-user"))
    return <></>
}