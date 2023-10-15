"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import { BiSolidChevronLeftCircle } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import Avatar from "../avatar/Avatar";
import ProfileSideDialog from "./ProfileSideDialog";
import AvatarGroup from "../avatar/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1


  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileSideDialog
        data={conversation}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
      <div className="w-full border-b flex py-3 px-4 lg:px-6 items-center justify-between shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/home/messages"
            className="lg:hidden black text-red-400 cursor-pointer transion duration-300"
          >
            <BiSolidChevronLeftCircle size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="text-lg font-semibold">
              {conversation.name || otherUser.name}
            </div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiDotsHorizontal
          size={32}
          className="text-red-400 hover:opacity-75 cursor-pointer"
          onClick={() => setProfileOpen(true)}
        />
      </div>
    </>
  );
};

export default Header;
