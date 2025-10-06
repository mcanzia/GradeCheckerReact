"use client"
import { useState } from "react"
import { LoginDetails } from "@/types/LoginDetails"
import LoginInput from '@/components/login-input';
import Link from "next/link";

export default function RegisterForm() {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        username: "",
        password: "",
        confirmPassword: ""
    });

    function handleSetLoginDetails(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setLoginDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <form className="flex flex-col items-center align-middle">
            <div className="border-b border-white/10 pb-12 w-full items-center">
                <h2 className="text-base/7 font-semibold text-white">Register</h2>
                <div className="mt-10 grid grid-cols-1 w-full gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <LoginInput name="username" type="text" label="User" value={loginDetails.username} onChange={handleSetLoginDetails} />
                    </div>
                    <div className="sm:col-span-4">
                        <LoginInput name="password" type="password" label="Password" value={loginDetails.password} onChange={handleSetLoginDetails} />
                    </div>
                    <div className="sm:col-span-4">
                        <LoginInput name="confirmPassword" type="password" label="Confirm Password" value={loginDetails.confirmPassword!} onChange={handleSetLoginDetails} />
                    </div>
                </div>
            </div>


            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/login" className="text-sm/6 font-semibold text-white">Sign In Instead</Link>
                <button
                    type="submit"
                    className="rounded-md hover:cursor-pointer bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
}