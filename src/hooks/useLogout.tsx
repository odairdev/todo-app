import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { auth } from "../firebase/config"
import { AuthActionKind } from "../context/AuthContext"

export function useLogout() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuth()

  const logout = async () => {
    setIsPending(true)
    setError(null)

    try {
      await auth.signOut()

      dispatch({type: AuthActionKind.LOGOUT, payload: null})

      if(!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch(err: any) {
      if(!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { isPending, error, logout}
}