"use client";

import { useRouter } from "next/navigation";
import Modal from "../modals/Modals";
import useConversation from "@/app/hooks/useConversations";
import { useState, useCallback } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { GoAlertFill } from "react-icons/go"
import { Dialog } from "@headlessui/react";
import Button from "../Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;

}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)

    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose()
      router.push('/home/messages')
      router.refresh()
    })
    .catch(() => toast.error("Something went wrong"))
    .finally(() => setIsLoading(false))
  }, [conversationId, router, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center text-red-400  sm:mx-0 sm:h-10 sm:w-10">
          <GoAlertFill size={24}/>
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title as="h3" className="text-base font-semibold text-gray-900">
              Delete
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} onClick={onDelete}>Delete</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
