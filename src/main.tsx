import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { CoreRouter } from "./core/router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { AuthContext } from "./context/authContext";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxCBGKipihjYwmMoWiPtr7fgevla-829E",
  authDomain: "simple-chat-469c4.firebaseapp.com",
  projectId: "simple-chat-469c4",
  storageBucket: "simple-chat-469c4.appspot.com",
  messagingSenderId: "573332269196",
  appId: "1:573332269196:web:2491bb953596ed7196f3a9",
  measurementId: "G-JSX46SEDMN",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContext.Provider
      value={{
        auth,
        app,
      }}
    >
      <CoreRouter />
    </AuthContext.Provider>
  </React.StrictMode>
);
