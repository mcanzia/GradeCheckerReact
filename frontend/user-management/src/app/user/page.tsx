
import UserList from "@/app/user/user-list";
import UserDetails from "@/app/user/user-details";
import type { User } from "@/types/User";
export default function User() {
    const selectedUser = { firstName: 'Michael', lastName: 'Canziani', email: 'canziani.michael@gmail.com', role: 'admin', groupName: 'test' } as User;
    return (
        <>
            <div className="grid grid-cols-2">
                <section>
                    <UserList />
                </section>
                <section>
                    <UserDetails user={selectedUser} />
                </section>
            </div>

        </>
    )
}
