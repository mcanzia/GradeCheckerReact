"use client";

import Link from "next/link";
import Button from "@/components/button";
import ThemeToggle from "@/components/theme-toggle";
import { useUserStore } from "@/store/user";

export default function Navbar() {
    const { currentUser, logout } = useUserStore();

    if (!currentUser) return null;

    return (
        <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="h-8 w-auto" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link href="/user" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                    Users
                                </Link>
                                <Link href="/group" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                    Groups
                                </Link>
                                <li className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                    <Button onClick={logout}>Logout</Button>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
