import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import useConversation from "./useConversations";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/home/messages",
        icon: IoChatbubblesSharp,
        active: pathname === "/home/messages" || !!conversationId,
      },
      {
        label: "Users",
        href: "/home/users",
        icon: FaUserFriends,
        active: pathname === "/home/users",
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
