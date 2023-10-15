"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  errors,
  disabled,
  type,
  required,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
      block
      text-md
      font-medium
      "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          placeholder={label}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            rounded-md
            block
            w-full
            border-0
            ring-1
            ring-gray-400
            focus:ring-red-300
            focus:ring-2`,
            errors[id] && "ring-red-600",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
