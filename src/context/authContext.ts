import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { createContext } from "react";

export const AuthContext = createContext({auth: <Auth>{}, app: <FirebaseApp>{}});