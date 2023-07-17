import { useEffect, useState } from "react";
import { auth } from "../main";

export function useUserID() {
  const [userID, setUserID] = useState<string>();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUserID(user?.uid)
    })
  }, [])

  return userID
}