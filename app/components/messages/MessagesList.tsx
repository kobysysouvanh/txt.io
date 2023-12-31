"use client";

import useConversation from "@/app/hooks/useConversations";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import MessagesBox from "./MessagesBox";
import Modal from "../modals/Modals";
import GroupChatModal from "../modals/GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface MessagesListProps {
  initialConversations: FullConversationType[];
  users: User[];
}

const MessagesList: React.FC<MessagesListProps> = ({
  initialConversations,
  users,
}) => {
  const session = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );

    };

    const removeHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });


      if (conversationId === conversation.id) {
        router.push("/home/messages");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversations, router, conversationId]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-[224px]
          lg:w-[320px]
          lg:block
          overflow-y-hidden
          border-r`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-4 mt-[3px] space-y-2">
          <div className="flex justify-between py-4">
            <div className="text-2xl font-bold ">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-red-400 text-white hover:opacity-80 cursor-pointer"
            >
              <MdGroupAdd className="w-5 h-5" />
            </div>
          </div>
          {conversations.map((conversation) => (
            <MessagesBox
              key={conversation.id}
              data={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default MessagesList;
