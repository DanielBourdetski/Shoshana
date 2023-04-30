import store, { generalActions } from "../store/store";
import httpService from "./httpService";

type UserData = { username: string; id: string };
type UserError = { error?: string };

interface AuthService {
  login: (
    username: string,
    password: string,
    DEBUG?: boolean
  ) => Promise<UserData | UserError>;
  register: (
    username: string,
    password: string,
    DEBUG?: boolean
  ) => Promise<UserData | UserError>;
  isLoggedIn: () => boolean;
}

const { general } = store.getState();

const authService: AuthService = {
  login: async (username, password, DEBUG = false): Promise<any> => {
    // replacement for an unsuccessful login call
    if (DEBUG) throw new Error();

    // if login -> successful change state to logged in with user data
    // else -> return error object to login component

    try {
      const loginResponse: string = await httpService.get(
        "http://localhost:3000/admin/login",
        {
          params: { username, password },
        }
      );

      // ? might need to be moved to another place
      localStorage.setItem("token", loginResponse);

      // TODO think of something better
      return { ok: false };
    } catch (err) {
      // TODO handle error (pop ups , notifications)
      console.log(err);
      // TODO think of something better
      return { ok: false };
    }
  },

  register: async (username, password, DEBUG = false): Promise<any> => {
    const user = JSON.stringify({ username, id: "1" });
    localStorage.setItem("users", user);

    // replacement for an unsuccessful register call
    if (DEBUG) return { error: "some error" };

    try {
      const registerResponse: string = await httpService.post(
        "http://localhost:3000/admin/register",
        {
          username,
          password,
        }
      );

      // ? might need to be moved to another place
      localStorage.setItem("token", registerResponse);

      // TODO think of something better
      return { ok: true };
    } catch (err) {
      // TODO handle error (pop ups , notifications)
      console.log(err);
      // TODO think of something better
      return { ok: false };
    }
  },

  isLoggedIn: () => store.getState().general.isLoggedIn,
};

export default authService;
