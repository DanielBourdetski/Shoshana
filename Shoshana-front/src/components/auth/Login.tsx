import { FormEvent, useState } from "react";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generalActions } from "../../store/store";
import toaster from "../../helpers/toaster";
import Input from "../common/Input";
import Button from "../common/Button";
import localService from "../../services/localService";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFieldInState = (value: string, field: "username" | "password") =>
    setCredentials((ps) => {
      return { ...ps, [field]: value };
    });

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { username, password } = credentials;
      const userData = await authService.login(username, password);

      if (!userData.ok) {
        // TODO handle unsuccessful login better

        throw new Error(userData.res);
      }

      localService.saveToken(userData.res);
      dispatch(generalActions.login(username));

      toaster.success("Login Successful");

      navigate("/");
    } catch (err: any) {
      toaster.authError(err.message);
    }
    // TODO handle error
  };

  return (
    <form
      onSubmit={onLogin}
      className="flex flex-col justify-center items-center h-full"
    >
      <Input
        label="Username"
        onChange={(value: string) => updateFieldInState(value, "username")}
        value={credentials.username}
      />

      <Input
        label="Password"
        password
        onChange={(value: string) => updateFieldInState(value, "password")}
        value={credentials.password}
      />

      <Button title="LOGIN" submit />
      <Link
        to={"/auth/register"}
        className="underline-offset-[-4px] hover:underline hover:underline-offset-[2px] duration-200"
      >
        Not a user? Click here to sign up.
      </Link>
    </form>
  );
};

export default Login;
