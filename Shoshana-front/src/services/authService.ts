import store, { generalActions } from "../store/store";
import httpService from "./httpService";

type UserData = { ok: boolean; res: string };
type RegistrationData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  address: string;
  privateNum: string;
  businessNum: string;
  logo: string;
};

interface AuthService {
  login: (
    username: string,
    password: string,
    DEBUG?: boolean
  ) => Promise<UserData>;
  register: (userData: RegistrationData, DEBUG?: boolean) => Promise<any>;
  isLoggedIn: () => boolean;
}

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

  register: async (
    userData,
    DEBUG = false
  ): Promise<{ ok: boolean; res: string }> => {
    // TODO convert these 2 lines to be applied on registration
    // const user = JSON.stringify({ username, id: "1" });
    // localStorage.setItem("users", user);

    // replacement for an unsuccessful register call
    if (DEBUG) return { ok: false, res: "some error" };

    const {
      username,
      password,
      email,
      firstName,
      lastName,
      business,
      address,
      businessNum,
      privateNum,
      logo,
    } = userData;

    const formattedUserData = {
      username,
      password,
      email,
      name: {
        first: firstName,
        last: lastName,
      },
      businessName: business,
      address,
      phoneNumbers: {
        private: privateNum,
        public: businessNum,
      },
      logo,
    };

    try {
      const registerResponse = await httpService.post(
        "http://localhost:3000/auth/register",
        formattedUserData
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
