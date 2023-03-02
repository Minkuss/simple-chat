import { Button } from "@blueprintjs/core";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FC, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { db } from "../../main";
import "./LoginPage.scss";

export const LoginPage: FC = () => {
  const auth = useContext(AuthContext).auth;
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const getData = async (id: string) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Error, no such document");
    }
  };

  const setFirstData = async (
    email: string,
    name: string,
    id: string,
    photoURL: string
  ) => {
    await setDoc(doc(db, "users", id), {
      email: email,
      name: name,
      chats: [],
      id: id,
      photoUrl: photoURL,
    });
  };

  const enterIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential != null ? credential.accessToken : {};
        const user = result.user;
        const dataSnap = getData(user.uid);
        dataSnap.then((value) => {
          if (value === undefined) {
            setFirstData(
              user.email || "",
              user.displayName || "",
              user.uid,
              user.photoURL || ""
            );
          }
        });

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
