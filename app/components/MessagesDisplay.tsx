"use client"

import { Chat, Message, User } from "@prisma/client";
import publish from "@/Actions/publishMessage";
import { useOptimistic, useRef } from "react";

export default function MessagesWindow({ user, chat, messages }: { user: User, chat: Chat, messages: Message[] }) {

    const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state: Message[], newTodo: Message) => {
        return [...state, newTodo]
    })
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    return (
        <>
            {chat.title}
            <ul className="flex flex-col gap-3">
                {optimisticMessages.map((message) => (
                    <li className="min-h-[30px] max-w-[50vw] bg-slate-300 p-2 rounded-md min-w-[50vw] text-black flex flex-col gap-2" key={message.id}>
                        <h3 className="text-sm font-bold">
                            {user.name + " " + user.surname}
                        </h3>
                        <p>
                            {message.content.split("<<br/>>").map(text => <span key={text.length * Math.random() * Math.random()}>{text} <br /></span>)}
                        </p>
                    </li>
                ))}
            </ul>

            <form action={async (formData) => {
                if (textareaRef.current) {
                    addOptimisticMessage({
                        content: textareaRef.current.value.replaceAll("\\n", "<<br/>>") as string,
                        userId: user.id as string,
                        chatId: chat.id as string,
                        date: new Date(),
                        id: "Provisional"
                    })
                    textareaRef.current.value = ""
                }
                publish(formData)
            }} className="w-1/2 grid place-content-center grid-cols-chat absolute top-[90vh]">
                <textarea onKeyDown={(e) => {
                    if(textareaRef.current) {
                        if(textareaRef.current.rows < 3 && e.key === "Enter") {
                            textareaRef.current.rows++
                            console.log(textareaRef.current.cols)
                        }
                    }
                }} ref={textareaRef} required rows={1} className="text-black" name="text" id=""></textarea>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}