export type Message = {
    id: string,
    content: string,
    date: Date,
    chat: Chat,
    author: Session
}

export type Chat = {
    id: string,
    title: string,
    authorId: Session,
}

export type Session = {
    userName: string,
    name: string,
    email: string,
    surname: string,
    id: string,
    chats: Chat[],
    messages: Message[]
}