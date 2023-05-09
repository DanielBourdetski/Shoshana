import "./DEBUG.css";
import authService from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../store/store";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import VIEW from "./VIEW";

const DEBUG = () => {
  const { isLoggedIn, user: loggedUser } = useSelector(
    (state: RootState) => state.general
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(generalActions.logout());
    navigate("/");
  };

  const onFastLogin = () => {
    dispatch(generalActions.login({ username: "DEBUG" }));
    navigate("/manager");
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
        <div>
          username: {loggedUser?.username ? loggedUser.username : "null"}
        </div>
      </div>
    </div>
  );
};

export default DEBUG;
