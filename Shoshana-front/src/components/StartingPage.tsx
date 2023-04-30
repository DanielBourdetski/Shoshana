import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import authService from "../services/authService";
import type { RootState } from "../store/store";

const StartingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userIsLoggedIn = useSelector(
    (state: RootState) => state.general.isLoggedIn
  );

  useEffect(() => {
    if (userIsLoggedIn) navigate("/manager");
  }, []);

  const onLogin = async () => {
    const userData = await authService.login(username, password);

    navigate("/manager");
  };

  const onRegister = async () => {
    const userData = await authService.register(username, password);
    console.log(userData);

    // authService.register({username, password})

    navigate("/manager");
  };

  const cancelRefresh = (e: FormEvent) => e.preventDefault();

  return (
    <form
      onSubmit={cancelRefresh}
      className="flex flex-col gap-4 w-1/3 mx-auto mt-40"
    >
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-black rounded"
        value={username}
        name="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-black rounded"
        value={password}
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex p-2 w-1/3 mx-auto justify-between">
        <button
          className="p-1 px-3 mx-1 border border-slate-800 rounded"
          onClick={onLogin}
        >
          Login
        </button>
        <button
          className="p-1 px-3 mx-1 border border-slate-800 rounded"
          onClick={onRegister}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default StartingPage;
