import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export type TAuthStatus = "loading" | "authenticated" | "unauthenticated";

export function useAuthStatus(): TAuthStatus {
  const [status, setAuthStatus] = useState<TAuthStatus>("loading");

  useEffect(() => {
    setAuthStatus("loading");
    getAuth().onAuthStateChanged((user) => {
      if (user) setAuthStatus("authenticated");
      else setAuthStatus("unauthenticated");
    });
  }, [setAuthStatus]);

  return status;
}