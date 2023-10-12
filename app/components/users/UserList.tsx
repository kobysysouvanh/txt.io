"use client"

import { User } from "@prisma/client"
import UserBox from "./UserBox"

interface UserListProps {
    users: User[]
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside
     className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-[224px]
        lg:w-[320px]
        lg:block
        overflow-y-hidden
        border-r
        block
        w-full
        left-0
     "
    >
        <div className="px-4 mt-[3px] space-y-2">
            <div className="flex-col">
                <div className="text-2xl font-bold py-4">
                    Users
                </div>
            </div>
            {users.map((user) => (
                <UserBox
                    key={user.id}
                    data={user}
                />
            ))}
        </div>

    </aside>
  )
}

export default UserList