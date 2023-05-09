import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

interface Props {
  Component: () => JSX.Element;
  elementType?: string;
}

const AuthGuard = ({ Component }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isLoggedIn()) {
      navigate("/auth/login");
    }
  }, []);

  return <Component />;
};

export default AuthGuard;
