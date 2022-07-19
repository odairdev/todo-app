import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { auth } from "../firebase/config";
import { AuthActionKind } from "../context/AuthContext";

export function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuth();

  const login = async (email: string, password: string) => {
    setIsPending(true);
    setError(null);

    try {
      const response = await auth.signInWithEmailAndPassword(email, password);

      if (!response) {
        throw new Error("Could not sign up, server error.");
      }

      dispatch({ type: AuthActionKind.LOGIN, payload: response.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
}
