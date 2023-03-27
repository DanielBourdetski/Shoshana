import { createContext } from "react"

type ServiceType = 'debug' | 'production'

export interface AuthService {
  login: (password: string, username: string) => Promise<void>
  register: (password: string, username: string) => Promise<void>
  isLoggedIn : () => boolean;
}

interface Services {
  authService: AuthService
}

const createServices = (type: ServiceType): Services => {
  if (type != 'debug') throw new Error('not debug')

  let data = {
    loggedIn : false
  };

  return {
    authService: {
      login: async (username, password) => {

        data.loggedIn = true;
        const savedUsers = localStorage.getItem('users');
        
        if (savedUsers) return;

        // if login successful change state to logged in with user data
        // else return error object to login component

        // ? for debug purposes (for now), login is always successful
        
        //return { username, id: '1' }
      },
      
      register: async (username, password) => {
        const user = JSON.stringify({username, id: '1'});
        localStorage.setItem('username', user)

        // if login successful change state to logged in with user data
        // else return error object to login component

        //return { username, id: '1' }
      },

      isLoggedIn: () => {
        return data.loggedIn;
      }
    }
  }
}

export const ServicesContext = createContext<Services>(createServices("debug"));

export default createServices