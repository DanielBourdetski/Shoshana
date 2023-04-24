import store, { generalActions } from "../store/store";

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
  login: async (username, password, DEBUG = false) => {
    const savedUsers = localStorage.getItem("users");

    // replacement for an unsuccessful login call
    if (DEBUG) return { error: "error" };

    // if login successful change state to logged in with user data
    // else return error object to login component

    // ? for debug purposes (for now), login is always successful

    // TODO create and provide real id from server
    store.dispatch(generalActions.login({ username, id: "1" }));

    return { userData: { username, id: "1" } };
  },

  register: async (username, password, DEBUG = false) => {
    const user = JSON.stringify({ username, id: "1" });
    localStorage.setItem("users", user);

    // replacement for an unsuccessful register call
    if (DEBUG) return { error: "some error" };

    // if login successful change state to logged in with user data
    // else return error object to login component

    // TODO create and provide real id from server
    store.dispatch(generalActions.login({ username, id: "1" }));

    return { username, id: "1" };
  },

  isLoggedIn: () => store.getState().general.isLoggedIn,
};

export default authService;
