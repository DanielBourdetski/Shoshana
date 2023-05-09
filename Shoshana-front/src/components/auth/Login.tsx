import { FormEvent, useState } from "react";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generalActions } from "../../store/store";
import { toast } from "react-toastify";
import toaster from "../../helpers/toaster";
import Input from "../common/Input";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { username, password } = credentials;
      const userData = await authService.login(username, password);

      if (!userData.ok) {
        // TODO handle unsuccessful login better

        throw new Error(userData.res);
      }

      dispatch(generalActions.login({ username }));
      navigate("/");
    } catch (err: any) {
      toaster.authError(err.message);
    }
    // TODO handle error
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center h-full"
    >
      <Input
        label="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCredentials((ps) => {
            return { ...ps, username: e.target.value };
          })
        }
        value={credentials.username}
      />

      <Input
        label="Password"
        password
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCredentials((ps) => {
            return { ...ps, password: e.target.value };
          })
        }
        value={credentials.password}
      />

      <button
        className="p-1 px-4 my-2 border border-slate-600 rounded hover:bg-slate-200 duration-150"
        type="submit"
      >
        LOGIN
      </button>
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
