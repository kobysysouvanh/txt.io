"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { FaPlus } from "react-icons/fa";

interface AvatarAuthFormProps {
  onChange: (value: string) => void;
  value: string;
}

const AvatarAuthForm: React.FC<AvatarAuthFormProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div className="flex items-center justify-center">
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="txt.io"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div className="cursor-pointer relative" onClick={() => open?.()}>
              <div className="flex border-2 rounded-[50%] w-[80px] h-[80px] overflow-hidden">
                <Image src={value || "/avatar.jpg"} alt="avatar" width={80} height={80} className="object-cover" unoptimized/>
              </div>
              <div className="w-6 h-6 flex border items-center justify-center rounded-full absolute bg-white bottom-0 right-0">
                <FaPlus className="w-4 h-4 text-red-400" />
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default AvatarAuthForm
