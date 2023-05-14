import React, { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import Input from "../../common/Input";
import toaster from "../../../helpers/toaster";
import {
  validatePassword,
  validateUsername,
} from "../../../helpers/validation";

type Initial = {
  credentials: { username: string; password: string; repeatPassword: string };
  setCredentials: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
      repeatPassword: string;
    }>
  >;
  onNextStage: FormEventHandler<HTMLFormElement>;
};

const Initial: React.FC<Initial> = ({
  credentials,
  setCredentials,
  onNextStage,
}) => {
  const handleNextStage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword(credentials.password))
      return toaster.info("Password does not match the required pattern");

    if (!validateUsername(credentials.username))
      return toaster.info("Invalid Username");

    if (credentials.password !== credentials.repeatPassword)
      return toaster.info("Passwords are not matching");

    onNextStage(e);
  };

  const updateField = (
    e: string,
    field: "username" | "password" | "repeatPassword"
  ) => {
    setCredentials((ps) => {
      return { ...ps, [field]: e };
    });
  };

  return (
    <form
      onSubmit={handleNextStage}
      className="flex flex-col justify-center items-center"
    >
      <Input
        label="Username"
        onChange={(value: string) => updateField(value, "username")}
        value={credentials.username}
      />

      <Input
        label="Password"
        password
        onChange={(value: string) => updateField(value, "password")}
        value={credentials.password}
      />

      <Input
        label="Repeat Password"
        password
        onChange={(value: string) => updateField(value, "repeatPassword")}
        value={credentials.repeatPassword}
      />

      <button className="p-1 px-4 my-2 border border-slate-600 rounded hover:bg-slate-200 duration-150">
        NEXT STEP (under construction)
      </button>
      <Link
        to={"/auth/login"}
        className="underline-offset-[-4px] hover:underline hover:underline-offset-[2px] duration-200"
      >
        Already a user? Click here to log in.
      </Link>
    </form>
  );
};

export default Initial;
