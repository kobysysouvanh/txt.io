"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import SidebarProfile from "../profile/SidebarProfile";
import { User } from "@prisma/client"

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
      hidden
      justify-between
      lg:fixed
      lg:inset-y-0
      lg:left-0
      lg:z-40
      lg:w-56
      lg:p-3
      lg:overflow-y-auto
      lg:bg-white
      lg:border-r-[1px]
      lg:pb-4
      lg:flex
      lg:flex-col
    "
    >
      <nav
        className="
        flex
        flex-col
        items-center
      "
      >
        <h1 className="text-4xl font-bold border-b w-full text-center pb-3">
          txt.io
        </h1>

        <ul role="list" className="w-full space-y-2 pt-2">
          {routes.map((route) => (
            <DesktopItem
              key={route.label}
              href={route.href}
              label={route.label}
              icon={route.icon}
              active={route.active}
            />
          ))}
        </ul>
      </nav>
      <SidebarProfile currentUser={currentUser} />
    </div>
  );
};

export default DesktopSidebar;
