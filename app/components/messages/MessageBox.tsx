"use client";

import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Avatar from "../avatar/Avatar";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "../modals/ImageModal";
import { AiOutlineZoomIn } from "react-icons/ai"

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwnMessage = session?.data?.user?.email === data?.sender?.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");

  const avatar = clsx(isOwnMessage && "order-2");

  const body = clsx("flex flex-col gap-2", isOwnMessage && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden rounded-lg",
    isOwnMessage ? "bg-red-400 text-white" : "bg-gray-200",
    data.image ? "p-0" : "py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <div className="relative group">
              <Image
                onClick={() => setImageModalOpen(true)}
                src={data.image}
                alt="image"
                height={288}
                width={288}
                className="object-cover cursor-pointer hover:scale-110 transition translate group-hover:brightness-50"
              />
              <AiOutlineZoomIn size={50} className="absolute left-0 right-0 top-[40%] text-white mx-auto -z-10 group-hover:z-10"/>
            </div>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwnMessage && seenList.length > 0 && (
          <div className="text-sm font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
