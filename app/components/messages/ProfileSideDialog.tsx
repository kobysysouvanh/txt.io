"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "../avatar/AvatarGroup";
import UserBox from "../users/UserBox";
import SettingsModal from "../modals/SettingsModal";
import clsx from "clsx";
import useActiveList from "@/app/hooks/useActiveList";

interface ProfileSideDialogProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSideDialog: React.FC<ProfileSideDialogProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const otherUser = useOtherUser(data);
  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1
  
  const joinedDate = useMemo(() => {
    if (data.isGroup) {
      return format(new Date(data.createdAt), "PP");
    }

    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt, data.createdAt, data.isGroup]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  const handleConfirmModal = () => {
    onClose()
    setConfirmOpen(true)
  }

  const handleSettingsModal = () => {
    onClose()
    setSettingsOpen(true)
  }

  return (
    <>
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        groupData={data}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-event-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full no-scrollbar bg-white flex-col overflow-y-scroll py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="text-red-400 outline-none hover:opacity-75"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close Panel</span>
                              <IoClose size={32} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-1">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <div className="font-semibold text-xl flex items-center mt-2">
                            <div className={data.isGroup ? "ml-6" : ""}>{title}</div>
                            {data.isGroup && (
                              <div
                              onClick={handleSettingsModal}
                              className="ml-1 text-red-400 hover:opacity-75 cursor-pointer"
                            >
                              <AiFillEdit size={26} />
                            </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>

                          <div className="w-full py-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-4 px-4 sm:space-y-2 sm:px-6">
                              {data.isGroup && (
                                <div className="space-y-2 pt-6">
                                  <dt className="text-sm font-medium text-red-400 sm:w-40 sm:flex-shrink-0">
                                    Members
                                  </dt>
                                  <dd className="mt-1 text-sm sm:col-span-2 space-y-2">
                                    {data.users.map((user) => (
                                      <UserBox key={user.id} data={user} isGroup />
                                    ))}
                                  </dd>
                                  <dt className="text-sm pt-6 font-medium text-red-400 sm:w-40 sm:flex-shrink-0">
                                    Date created
                                  </dt>
                                  <dd className="mt-1 text-sm sm:col-span-2 space-y-2">
                                    {joinedDate}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div className="space-y-2 pt-6">
                                  <dt className="text-sm font-medium text-red-400 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                  <dt className="text-sm pt-6 font-medium text-red-400 sm:w-40 sm:flex-shrink-0">
                                    Member since
                                  </dt>
                                  <dd className="mt-1 text-sm sm:col-span-2">
                                    {joinedDate}
                                  </dd>
                                </div>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-10 my-8 items-center justify-center">
                        <div
                          onClick={handleConfirmModal}
                          className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                        >
                          <div className="w-10 h-10 bg-red-400 text-white rounded-full flex items-center justify-center">
                            <HiTrash size={24} />
                          </div>
                          <div className="text-sm font-light text-gray-500">
                            {data.isGroup
                              ? "Delete Group"
                              : "Delete Conversation"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileSideDialog;
