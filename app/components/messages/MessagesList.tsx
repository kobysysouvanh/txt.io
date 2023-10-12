"use client"

import useConversation from "@/app/hooks/useConversations"
import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MdGroupAdd } from "react-icons/md"
import MessagesBox from "./MessagesBox"

interface MessagesListProps {
  initialConversations: FullConversationType[]
}


const MessagesList: React.FC<MessagesListProps> = ({
  initialConversations
}) => {
  const router = useRouter()
  const [conversations, setConversations] = useState(initialConversations) 

  const { conversationId, isOpen } = useConversation()

  return (
    <aside
    className={clsx(`
    fixed
    inset-y-0
    pb-20
    lg:pb-0
    lg:left-[224px]
    lg:w-[320px]
    lg:block
    overflow-y-hidden
    border-r
 `,
    isOpen ? 'hidden' : 'block w-full left-0'
 )}
    >
      <div className="px-4 mt-[3px] space-y-2">
            <div className="flex justify-between py-4">
                <div className="text-2xl font-bold ">
                    Messages
                </div>
                <div className="rounded-full p-2 bg-red-400 text-white hover:opacity-80 cursor-pointer">
                  <MdGroupAdd className="w-5 h-5"/>
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
  )
}

export default MessagesList