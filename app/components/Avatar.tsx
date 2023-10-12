"use client"

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarProps {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div
    className="
    relative
    h-12
    w-12
    rounded-full
    overflow-hidden
    inline-block
    ">
        <Image
        src={user?.image || '/avatar.png'}
        fill
        alt='avatar'
        className="object-cover"
        />
    </div>
  )
}

export default Avatar