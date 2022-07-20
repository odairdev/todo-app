import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import firebase from 'firebase/app'
import { auth } from "../firebase/config";

export enum AuthActionKind {
  AUTH_IS_READY = 'AUTH_IS_READY',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SIGNUP = 'SIGNUP',
}

interface AuthContextData {
  user: firebase.User | null | undefined;
  authIsReady: boolean;
  dispatch: Dispatch<AuthAction>
}

interface AuthState {
  user: firebase.User | null | undefined;
  authIsReady: boolean;
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
    case AuthActionKind.AUTH_IS_READY:
      return {...state, user: action.payload, authIsReady: true}
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

const initialState = {
  user: null,
  authIsReady: false
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({type: AuthActionKind.AUTH_IS_READY, payload: user})

      unsub()
    }, err => {
      console.log('authState error: ' + err)
    })
  }, [])

  
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

