"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;

  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ type, onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex
        w-full
        justify-center
        rounded-md
        px-3
        py-2
        bg-red-400
        text-white
        hover:opacity-90`,
        disabled && "opacity-50 cursor-default"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
