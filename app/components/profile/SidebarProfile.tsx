"use client";

import { User } from "@prisma/client";
import { TbLogout } from "react-icons/tb";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarProfileProps {
  currentUser?: User;
  onClick: () => void;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({
  currentUser,
  onClick,
}) => {
  return (
    <div className="w-full rounded-md bg-gray-100 flex gap-x-2 py-2 px-3 items-center justify-between">
      <div onClick={onClick} className="cursor-pointer relative items-center justify-center group">
        <Image
          src={currentUser?.image || "/avatar.jpg"}
          alt="avatar"
          height={40}
          width={40}
          unoptimized
          className="h-14 w-14 rounded-full group-hover:brightness-50 object-cover"
        />
        <div className="absolute top-4 left-3 -z-10 group-hover:z-10 text-white">Edit</div>
      </div>
      <span className="font-bold text-lg">{currentUser?.name}</span>
      <TbLogout
        onClick={() => signOut()}
        className="w-6 h-6 hover:text-gray-400 cursor-pointer transition duration-300"
      />
    </div>
  );
};

export default SidebarProfile;
