"use client";

import { useRouter } from "next/navigation";
import { FullConversationType } from "@/app/types/index";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import clsx from "clsx";
import Avatar from "../avatar/Avatar";
import { format } from "date-fns";
import AvatarGroup from "../avatar/AvatarGroup";

interface MessagesBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const MessagesBox: React.FC<MessagesBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/home/messages/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative p-3 flex items-center space-x-3 bg-neutral-100 hover:bg-red-400 group/userbox rounded-md transition cursor-pointer duration-300`,
        selected ? "bg-red-400 group/userbox:text-white" : "bg-neutral-100"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p
              className={clsx(
                `text-lg font-semibold text-gray-900 group-hover/userbox:text-white`,
                selected ? "text-white" : "text-black"
              )}
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className={clsx(
                  `text-sm text-gray-500 group-hover/userbox:text-white`,
                  selected ? "text-white" : "text-neutral-500"
                )}
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate group-hover/userbox:text-white`,
              hasSeen ? "text-gray-500" : "text-black font-bold",
              selected ? "text-white" : "text-black"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
