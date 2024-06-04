"use client"

import { Chat, Message, User } from "@prisma/client";
import { useEffect, useOptimistic } from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import styles from "./messagesDisplay.module.css"

export default function MessagesWindow({ user, chat, messages }: { user: User, chat: Chat, messages: Message[] }) {

    const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state: Message[], newTodo: Message) => {
        return [...state, newTodo]
    })
    const scrollToBottom = () => {
        window.scrollTo({ behavior: "smooth", top: document.body.scrollHeight })
    }
    useEffect(() => {
        scrollToBottom()
    }, [optimisticMessages])
    useEffect(() => {
        scrollToBottom()
    }, [])
    return (
        <>
            <h1>{chat.title}</h1>
            <section className={styles.messagesContainer}>
                <MessageList messages={optimisticMessages} user={user} />
            </section>

            <MessageForm addMessage={addOptimisticMessage} chat={chat} user={user} />

        </>
    )
}