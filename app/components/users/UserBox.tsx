"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "../avatar/Avatar";
import LoadingModal from "../modals/LoadingModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import clsx from "clsx";

interface UserBoxProps {
  data: User;
  isGroup?: boolean
}

const UserBox: React.FC<UserBoxProps> = ({ data, isGroup }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/home/messages/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={isGroup ? () => {} : handleClick}
        className={clsx(`w-full relative p-3 flex items-center space-x-3 bg-neutral-100  rounded-md `,
          isGroup ? "" : "hover:bg-red-400 group/userbox cursor-pointer transition  duration-300"
        )}
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-medium text-gray-900 group-hover/userbox:text-white">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
