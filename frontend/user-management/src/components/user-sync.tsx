"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/user";
import { User } from "@/types/User";

export default function UserSync() {
    const { data: session } = useSession();
    const setUser = useUserStore((s) => s.setUser);

    useEffect(() => {
        if (session?.user) {
            setUser({
                id: '',
                name: session.user.name,
                email: session.user.email,
                role: '',
                groupName: ''
            } as User);
        } else {
            setUser(null);
        }
    }, [session, setUser]);

    return null;
}
