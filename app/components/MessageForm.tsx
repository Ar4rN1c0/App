import { Chat, User } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./messagesDisplay.module.css";
import publish from "@/Actions/publishMessage";
import EquationMenu from "./EquationMenu";
import AddDocumentMenu from "./AddDocumentMenu";


type ShowState = {
  showEquations: boolean;
  showDocuments: boolean;
};

interface MessageFormProps {
  addMessage: CallableFunction;
  chat: Chat;
  user: User;
}

export default function MessageForm({ addMessage, chat, user }: MessageFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showState, setShowState] = useState<ShowState>({ showEquations: false, showDocuments: false });
  const [pdfText, setPdfText] = useState<string>("")

  const handleSubmit = useCallback(async (formData: FormData) => {
    if (textareaRef.current) {
      const message = formData.get("text") as string;
      if (!message.trim()) return; 

      const formattedMessage = message.replaceAll("\n", "<<br/>>");
      
      addMessage({
        content: formattedMessage,
        userId: user.id,
        chatId: chat.id,
        date: new Date(),
        id: "Provisional",
      });

      addMessage({
        content: "",
        userId: "machinebotid",
        chatId: chat.id as string,
        date: new Date(),
        id: "Provisional Response",
      });

      textareaRef.current.value = "";
      
      try {
        await publish(formData);
      } catch (error) {
        console.error("Failed to publish message", error);
      }
    }
  }, [addMessage, chat.id, user.id]);

  useEffect(() => {
    if (showState.showDocuments && showState.showEquations) {
      setShowState((prevState) => ({ ...prevState, showDocuments: false }));
    }
  }, [showState]);

  return (
    <article className={styles.formContainer}>
      <button
        onClick={() => setShowState((prevState) => ({ ...prevState, showDocuments: !prevState.showDocuments }))}
        className={styles.button}
        aria-expanded={showState.showDocuments}
        aria-label="Toggle document menu"
      >
        Add Document
      </button>
      {showState.showDocuments && <AddDocumentMenu state={{pdfText, setPdfText}} />}

      <button
        onClick={() => setShowState((prevState) => ({ ...prevState, showEquations: !prevState.showEquations }))}
        className={styles.button}
        aria-expanded={showState.showEquations}
        aria-label="Toggle equation menu"
      >
        Insert Equation
      </button>
      {showState.showEquations && <EquationMenu />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        className={styles.form}
      >
        <textarea
          className={styles.input}
          ref={textareaRef}
          required
          name="text"
          placeholder="Type your message here..."
          aria-label="Message input"
        ></textarea>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </article>
  );
}
