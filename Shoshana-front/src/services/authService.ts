import store, { generalActions } from "../store/store";
import httpService from "./httpService";

type UserData = { ok: boolean; res: string };

interface AuthService {
  login: (
    username: string,
    password: string,
    DEBUG?: boolean
  ) => Promise<UserData>;
  register: (
    username: string,
    password: string,
    DEBUG?: boolean
  ) => Promise<any>;
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
      const loginResponse = await httpService.post(
        "http://localhost:3000/auth/login",
        {
          username,
          password,
        }
      );

      // ? might need to be moved to another place
      localStorage.setItem("token", loginResponse.data.token);

      // TODO think of something better
      return { ok: true, res: loginResponse.data.token };
    } catch (err: any) {
      // TODO handle error (pop ups , notifications)
      console.log(err);
      // TODO think of something better
      return { ok: false, res: err.response.data };
    }
  },

  register: async (username, password, DEBUG = false): Promise<any> => {
    const user = JSON.stringify({ username, id: "1" });
    localStorage.setItem("users", user);

    // replacement for an unsuccessful register call
    if (DEBUG) return { error: "some error" };

    try {
      const registerResponse = await httpService.post(
        "http://localhost:3000/auth/register",
        {
          username,
          password,
        }
      );

      // ? might need to be moved to another place
      localStorage.setItem("token", registerResponse.data.token);

      // TODO think of something better
      return { ok: true, res: registerResponse.data.token };
    } catch (err: any) {
      // TODO handle error (pop ups , notifications)
      console.log(err);
      // TODO think of something better
      return { ok: false, res: err.response.data };
    }
  },

  isLoggedIn: () => store.getState().general.isLoggedIn,
};

export default authService;
