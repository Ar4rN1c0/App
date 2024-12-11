import getUserInfo from "@/Actions/getUserInfo"
import { redirect } from "next/navigation"

export default async function MyAccountPage() {
    const userInfo = await getUserInfo()
    if (!userInfo) redirect("/login")

    return (
        <>
            <main className="w-[100vw] h-[100vh] pt-[80px] grid place-content-center">
                <section className="grid place-content-center grid-cols-2 w-[50vw] h-[50vh] bg-slate-500 rounded-3xl p-[20px]">
                    <article>
                        <h1 className="text-2xl font-bold">{userInfo.name} {userInfo.surname}</h1>
                        <p className="text-sm ">@{userInfo.id}</p>
                    </article>
                    <article>
                        <div className="flex flex-row justify-between max-w-[90%]">
                            <h2>Number of chats</h2>
                            <p>{userInfo.chats.length}</p>
                        </div>
                        <div className="flex flex-row justify-between max-w-[90%]">
                            <h2>Number of messages</h2>
                            <p>{userInfo.messages.length}</p>
                        </div>
                        <div className="flex flex-row justify-between max-w-[90%]">
                            <h2>user joined</h2>
                        <p>{userInfo.createdAt.toLocaleString()}</p>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}