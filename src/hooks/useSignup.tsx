import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuth } from "./useAuth";
import { AuthActionKind } from "../context/AuthContext";

export function useSignup() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuth()

  const signup = async (name: string, email: string, password: string) => {
    setIsPending(true)

    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)

      if(!response) {
        throw new Error('Could not sign up, server error.')
      }

      await response.user?.updateProfile({
        displayName: name
      })

      dispatch({type: AuthActionKind.SIGNUP, payload: response.user})

      setIsPending(false)
      setError(null)

    } catch(err: any) {
      if(!isCancelled) {
        setIsPending(false)
        setError(err.message)
      }
    }

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {isPending, error, signup}

}