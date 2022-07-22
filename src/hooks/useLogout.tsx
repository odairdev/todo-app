import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { auth } from "../firebase/config";
import { AuthActionKind } from "../context/AuthContext";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await auth.signOut();

      dispatch({ type: AuthActionKind.LOGOUT, payload: null });

      setError(null);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { isPending, error, logout };
}
