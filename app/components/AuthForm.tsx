"use client";

import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Avatar from "./Avatar";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios Register
    } else {
      //NextAuth SignIn
    }
  };

  return (
    <div
      className="
        mt-8 
        sm:mx-auto 
        sm:w-full 
        sm:max-w-md
    "
    >
      <div
        className="
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
      "
      >
        <h1 className="text-center text-2xl font-bold mb-5">
          {variant === "REGISTER" ? "Sign Up" : "Login"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <div>
              <Avatar />
              <Input
                id="name"
                label="Name"
                type="text"
                register={register}
                errors={errors}
              />
            </div>
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div className="py-6">
            <Button disabled={isLoading} type="submit" />
          </div>
        </form>
        <div className="flex space-x-2 font-medium">
          <div>
            {variant === "LOGIN"
              ? "New to txt.io?"
              : "Already have an account?"}
          </div>
          <div
            onClick={toggleVariant}
            className="cursor-pointer text-red-400 hover:underline"
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
