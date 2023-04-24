import "./DEBUG.css";
import authService from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../store/store";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";

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
    dispatch(generalActions.login({ username: "Admin", id: "1" }));
    navigate("/manager");
  };

  return (
    <div className="col DEBUG">
      <div className="row">
        {isLoggedIn ? (
          <button className="btn" onClick={onLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="btn" onClick={onFastLogin}>
            FAST LOGIN
          </button>
        )}
      </div>

      <div className="col">
        <div>username: {loggedUser?.username || "null"}</div>
        <div>id : {loggedUser?.id || "null"}</div>
      </div>
    </div>
  );
};

export default DEBUG;
