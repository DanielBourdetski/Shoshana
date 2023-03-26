import { createContext } from "react"

type ServiceType = 'debug' | 'production'

export const ServicesContext = createContext<ServiceType>('production');
export const UserDataContext = createContext<UserData | null>(null);

interface AuthService {
  login: (password: string, username: string) => Promise<UserData | undefined>
  register: (password: string, username: string) => Promise<UserData | undefined>
}

export interface UserData {
  username: string
  id: string
}

interface Services {
  authService: AuthService
}

const createServices = (type: ServiceType): Services => {
  if (type != 'debug') throw new Error('not debug')

  return {
    authService: {
      login: async (username, password) => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) return;

        // if login successful change state to logged in with user data
        // else return error object to login component

        // ? for debug purposes (for now), login is always successful
        
        return { username, id: '1' }
      },
      
      register: async (username, password) => {
        const user = JSON.stringify({username, id: '1'});
        localStorage.setItem('username', user)

        // if login successful change state to logged in with user data
        // else return error object to login component

        return { username, id: '1' }
      }
    }
  }
}

export default createServices