"use client";

import useActiveList from "@/app/hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div
        className="
          relative
          h-11
          w-11
          overflow-hidden
          rounded-full
          inline-block
      ">
        <Image
          src={user?.image || "/avatar.png"}
          fill
          alt="avatar"
          className="object-cover"
          sizes="(max-width: 768px) 100vw rounded-full"
        />
      </div>
      {isActive && (
        <span
          className="
        absolute
        rounded-full
        block
        bg-green-500
        ring-2
        ring-white
        top-0
        right-0
        h-2
        w-2
        md:h-3
        md:w-3
      "
        />
      )}
    </div>
  );
};

export default Avatar;
