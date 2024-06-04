import { Message, User } from "@prisma/client";
import styles from "./messagesDisplay.module.css"
import { useEffect, useRef } from "react";


export default function MessageList({ messages, user }: { messages: Message[], user: User }) {

    
    const containerRef = useRef<HTMLUListElement>(null)
    

    return (
        <ul ref={containerRef}>
            {messages.map((message) => (
                <li className={styles.message} key={message.id}>
                    <h3 className="text-sm font-bold">
                        {(message.userId === "machinebotid" ? "IB Chat" : user.name + " " + user.surname)}
                    </h3>
                    <article>
                        {message.content ?
                            message.content.split("<<br/>>").map(text =>
                                (<p key={text.length * Math.random() * Math.random()}>{text} <br /></p>)
                            ) :
                            (<div className="animate-bounce">Loading</div>)
                        }
                    </article>
                </li>
            ))}
        </ul>
    )
}