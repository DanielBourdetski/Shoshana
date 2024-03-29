import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import authService from "../services/authService";
import type { RootState } from "../store/store";
import Login from "./auth/Login";
import Registration from "./auth/registration/Registration";

const StartingPage = () => {
  const navigate = useNavigate();
  const formType = useParams().formType as "login" | "register";

  const userIsLoggedIn = useSelector(
    (state: RootState) => state.general.isLoggedIn
  );

  useEffect(() => {
    if (userIsLoggedIn) navigate("/manager");
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-10">
        {formType === "login" ? "Login" : "Register"}
      </h1>
      {formType === "login" && <Login />}
      {formType === "register" && <Registration />}
    </div>
  );
};

export default StartingPage;
