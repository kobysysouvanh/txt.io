"use client";

import { User } from "@prisma/client";
import useRoutes from "../../hooks/useRoutes";
import useConversation from "../../hooks/useConversations";
import MobileItem from "./MobileItem";
import SidebarProfile from "../profile/SidebarProfile";
import Image from "next/image";

interface MobileNavbarProps {
  currentUser?: User;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
    fixed 
    flex
    w-full
    bottom-0
    z-40
    items-center
    justify-between
    border-t
    lg:hidden
  "
    >
      {routes.map((route) => (
        <MobileItem 
          key={route.href}
          href={route.href}
          icon={route.icon}
          active={route.active}
        />
      ))}
      <div className="p-3 w-full flex items-center justify-center">
        <Image
          src={currentUser?.image || '/avatar.jpg'}
          height={20}
          width={20}
          alt="avatar"
          unoptimized
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default MobileNavbar;
