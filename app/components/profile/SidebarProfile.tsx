"use client";

import { User } from "@prisma/client";
import {TbLogout} from "react-icons/tb"
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarProfileProps {
  currentUser?: User;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ currentUser }) => {
  return (
    <div className="w-full rounded-md bg-gray-100 flex gap-x-2 py-2 px-3 items-center justify-between">
      <Image
        src={currentUser?.image || "/avatar.jpg"}
        alt="avatar"
        height={40}
        width={40}
        unoptimized
        className="h-14 w-14 rounded-full object-cover"
      />
      <span className="font-bold text-lg">{currentUser?.name}</span>
      <TbLogout onClick={() => signOut()} className="w-6 h-6 hover:text-gray-400 cursor-pointer transition duration-300"/>
    </div>
  );
};

export default SidebarProfile;
