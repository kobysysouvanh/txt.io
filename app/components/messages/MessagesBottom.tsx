"use client";

import useConversation from "@/app/hooks/useConversations";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { BsFillEmojiSmileFill, BsSendFill } from "react-icons/bs";

const MessagesBottom = () => {
  const { conversationId } = useConversation();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const emojiRef = useOutsideClick(() => {
    setShowEmojiPicker(false);
  });

  const toggleEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji: any) => {
    setMessage((message) => (message += emoji.emoji));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    setValue("message", message);
  }, [message, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    setMessage("");
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="p-4 gap-4 flex w-full items-center border-t relative">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="txt.io"
      >
        <AiFillCamera
          size={24}
          className="text-red-400 cursor-pointer hover:text-opacity-75 transition duration-300"
        />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <div className="relative w-full flex items-center gap-4">
          <div ref={emojiRef} className="hidden lg:block">
            {showEmojiPicker && (
              <div className="absolute bottom-16 z-40">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <BsFillEmojiSmileFill
              onClick={toggleEmoji}
              size={24}
              className="text-red-400 cursor-pointer hover:text-opacity-75 transition duration-300"
            />
          </div>
          <input
            id="message"
            value={message}
            autoComplete="message"
            placeholder="Type a message.."
            {...register("message", { required: true })}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="bg-red-400 focus:outline-none rounded-full w-full p-1 px-4 text-white placeholder-white"
          />
        </div>
        <button
          type="submit"
          className="rounded-full p-2 bg-red-400 hover:opacity-75 outline-none"
        >
          <BsSendFill className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default MessagesBottom;
