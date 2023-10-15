"use client";

import { Conversation, User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../Button";
import Input from "../Input";
import Modal from "./Modals";
import useConversation from "@/app/hooks/useConversations";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

interface SettingsModalProps {
  currentUser?: User;
  groupData?: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  groupData,
}) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name || groupData?.name,
      image: currentUser?.image || null,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (groupData) {
      axios
        .post(`/api/settings/${conversationId}`, data)
        .then(() => {
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    } else {
      axios
        .post("/api/settings", data)
        .then(() => {
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="pb-2">
            <h2 className="font-bold text-xl pt-5 sm:pt-2">
              {currentUser ? "Profile" : "Group Settings"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {currentUser
                ? "Make changes to your profile."
                : "Make changes to the group."}
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              {currentUser && (
                <div>
                  <label className="block text-md font-medium">Photo</label>
                  <div className="flex mt-2 items-center gap-x-3">
                    <Image
                      src={image || currentUser?.image || "/avatar.jpg"}
                      alt="Avatar"
                      width={40}
                      height={40}
                      unoptimized
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <CldUploadButton
                      options={{ maxFiles: 1 }}
                      onUpload={handleUpload}
                      uploadPreset="txt.io"
                    >
                      <Button disabled={isLoading} type="button">
                        Change
                      </Button>
                    </CldUploadButton>
                  </div>
                </div>
              )}
              <Input
                label="Name"
                id="name"
                errors={errors}
                disabled={isLoading}
                required
                register={register}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6">
            <div className="lg:hidden">
              <Button disabled={isLoading} type="button" onClick={() => signOut()}>
                <TbLogout className="w-6 h-6" />
              </Button>
            </div>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
