import { Button } from "@blueprintjs/core";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./LoginPage.scss";

export const LoginPage: FC = () => {
  const auth = useContext(AuthContext).auth;
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const enterIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential != null ? credential.accessToken : {};
        const user = result.user;
        navigate("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  };

  return (
    <div className="container">
      <Button onClick={enterIn} large text="Enter by Google" intent="primary" />
    </div>
  );
};
