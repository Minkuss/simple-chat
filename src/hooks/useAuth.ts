import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../main";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return user;
};
