"use client"

import { signOut } from "next-auth/react"
import {useRouter} from "next/navigation"

export default function LogoutButton () {
    const router = useRouter()
    return (
        <button onClick={() => {
            signOut()
            router.refresh()
        }}>
            Logout
        </button>
    )
}