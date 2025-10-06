"use client"
import LoginInput from "@/components/login-input";
import Button from "@/components/button";
import { LoginDetails } from "@/types/LoginDetails";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        username: "",
        password: "",
    });

    function handleSetLoginDetails(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setLoginDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center align-middle">
            <div className="border-b border-white/10 pb-12 w-full items-center">
                <h2 className="text-base/7 font-semibold text-white">Login</h2>
                <div className="mt-10 grid grid-cols-1 w-full gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <LoginInput name="username" type="text" label="User" value={loginDetails.username} onChange={handleSetLoginDetails} />
                    </div>
                    <div className="sm:col-span-4">
                        <LoginInput name="password" type="password" label="Password" value={loginDetails.password} onChange={handleSetLoginDetails} />
                    </div>
                </div>
            </div>


            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/register" className="text-sm/6 font-semibold text-white">Sign Up Instead</Link>
                <button
                    type="submit"
                    className="rounded-md hover:cursor-pointer bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Sign In
                </button>
            </div>
        </form >
    )
}