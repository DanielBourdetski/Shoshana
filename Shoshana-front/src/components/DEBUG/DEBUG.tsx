import "./DEBUG.css";
import authService from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../store/store";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import VIEW from "./VIEW";
import toaster from "../../helpers/toaster";

const DEBUG = () => {
  const { isLoggedIn, username: username } = useSelector(
    (state: RootState) => state.general
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(generalActions.logout());
    navigate("/");
  };

  const onFastLogin = async () => {
    try {
      const loginData = await authService.login("admin", "admin");
      if (!loginData.ok) throw new Error("Unexpected error on fast login");

      toaster.success("Fast login successful");

      dispatch(generalActions.login("admin"));
      navigate("/");
    } catch (err: any) {
      toaster.authError(err.message);
    }
  };

  return (
    <div className="flex flex-col w-80 DEBUG backdrop-blur">
      <VIEW setView={() => {}} />
      <div className="row">
        {isLoggedIn ? (
          <button
            className="border border-black rounded p-1 mt-1"
            onClick={onLogout}
          >
            LOGOUT
          </button>
        ) : (
          <button
            className="border border-black rounded p-1 mt-1"
            onClick={onFastLogin}
          >
            FAST LOGIN
          </button>
        )}
      </div>

      <div className="col">
        <div>username: {username ? username : "null"}</div>
      </div>
    </div>
  );
};

export default DEBUG;
