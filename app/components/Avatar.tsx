"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Avatar = () => {
  const [image, setImage] = useState("/avatar.jpg");

  return (
    <div className="flex items-center justify-center relative">
      <div className="cursor-pointer">
        <Image
          src={image}
          alt="avatar"
          width={60}
          height={60}
          className="rounded-full border-2 border-red-400"
        />
        <div className="w-6 h-6 flex border items-center justify-center rounded-full absolute bg-white bottom-0 right-36">
          <FaPlus className="w-4 h-4 text-red-400" />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
