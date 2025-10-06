import type { User } from '@/types/User';
export default function UserDetails({ user }: { user: User }) {
    return (
        <>
            <article className="flex flex-col gap-3 items-center align-start">
                <h1 className="font-bold">User Details</h1>
                <div className="grid grid-cols-2 gap-3">
                    <label><strong>First Name:</strong></label> {user.firstName}
                    <label><strong>Last Name:</strong></label> {user.lastName}
                    <label><strong>Email:</strong></label> {user.email}
                    <label><strong>Role:</strong></label> {user.role}
                    <label><strong>Group Name:</strong></label> {user.groupName}
                </div>
            </article>
        </>
    )
}