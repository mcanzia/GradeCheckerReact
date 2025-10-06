"use client"

import { User } from "@/types/User"

export default function UserList() {
    const people = [{ firstName: 'Michael', lastName: 'Canziani', email: 'canziani.michael@gmail.com', role: 'admin', groupName: 'test' } as User]
    return (
        <>
            <ul role="list" className="divide-y divide-white/5 border-white border-solid border-1">
                {people.map((person) => (
                    <li key={person.email} className="grid grid-cols-2 gap-x-6 py-5 hover:bg-gray-500 hover:cursor-pointer">
                        <div className="flex min-w-0 gap-x-4 mx-2">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-white">{person.firstName} {person.lastName}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-400">{person.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center align-middle mx-2">
                            <p className="text-sm/6 text-white font-bold">{person.role}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}