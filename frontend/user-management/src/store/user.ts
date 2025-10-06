import { create } from "zustand";
import { User } from "@/types/User";
import { LoginDetails } from "@/types/LoginDetails";
import { signIn } from "next-auth/react";

type UserState = {
    currentUser: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    signInWithCredentials: (credentials: LoginDetails) => void;
};

async function signInWithCredentials(credentials: LoginDetails) {
    await signIn("credentials", {
        username: credentials.username,
        password: credentials.password,
        callbackUrl: "/user",
    });
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    setUser: (user) => set({ currentUser: user }),
    logout: () => set({ currentUser: null }),
    signInWithCredentials: (credentials: LoginDetails) => signInWithCredentials(credentials)
}));
