import { Chat, User } from "@prisma/client"
import { useRef, useState } from "react"
import styles from "./messagesDisplay.module.css"
import publish from "@/Actions/publishMessage";
import EquationMenu from "./EquationMenu";

export default function MessageForm({ addMessage, chat, user }: { addMessage: CallableFunction, chat: Chat, user: User }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [showEquations, setShowEquations] = useState<boolean>(false)
    const handleSubmit = async (formData: FormData) => {
        if (textareaRef.current) {
            const message = formData.get("text") as string
            const formattedMessage = message.replaceAll("\n", "<<br/>>")
            addMessage({
                content: formattedMessage,
                userId: user.id as string,
                chatId: chat.id as string,
                date: new Date(),
                id: "Provisional"
            })
            addMessage({
                content: "",
                userId: "machinebotid",
                chatId: chat.id as string,
                date: new Date(),
                id: "Provisional Response"
            })
            textareaRef.current.value = ""
        }
        publish(formData)
    }
    return (
        <article className={styles.formContainer}>
        <button className={styles.button}>Add document</button>
        <button onClick={() => setShowEquations(!showEquations)} className={styles.button}>Insert equation</button>
            {showEquations && (
                <EquationMenu/>
            )}
        <form action={handleSubmit} className={styles.form}>
            <textarea className={styles.input} ref={textareaRef} required name="text" id=""></textarea>
            <button className={styles.button} type="submit"><p>Submit</p></button>
        </form>
        </article>
    )
}