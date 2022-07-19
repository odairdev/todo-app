import { createContext, Dispatch, ReactNode, useReducer } from "react";
import firebase from 'firebase/app'

export enum AuthActionKind {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SIGNUP = 'SIGNUP'
}

interface AuthContextData {
  user: firebase.User | null | undefined;
  dispatch: Dispatch<AuthAction>
}

type AuthState = {
  user: firebase.User | null | undefined;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

type AuthAction = {
  type: AuthActionKind,
  payload: firebase.User | null | undefined
}

const authReducer = (state: AuthState, action: AuthAction) => {
  switch(action.type) {
    case AuthActionKind.SIGNUP:
      return {...state, user: action.payload}
    case AuthActionKind.LOGIN:
      return {...state, user: action.payload}
    case AuthActionKind.LOGOUT:
      return {...state, user: null}
    default:
      return state
  }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {user: null})

  console.log(state.user)
  
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

