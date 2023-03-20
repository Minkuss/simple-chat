import { Card } from "@blueprintjs/core";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { db } from "../../main";
import { IChat, IMassage } from "../../types";
import { MassageComponent, MassageInput } from "../../ui-components";
import { ChatHeader } from "../../ui-components/ChatHeader/ChatHeader";
import "./ChatComponent.scss";

export const ChatComponent: FC = () => {
  const auth = useContext(AuthContext).auth;
  const userID = auth.currentUser?.uid;

  const { username } = useParams();
  const location = useLocation();
  const { interlocutorID } = location.state;
  const [chatData, setChatData] = useState<IChat>();

  useEffect(() => {
    console.log(interlocutorID);
    if (userID) {
      onSnapshot(doc(db, "users", userID), (doc) => {
        doc.data()?.chats.map(async (el: any) => {
          const chatData: any = (await getDoc(el)).data();
          const initiatorUser: any = await (
            await getDoc(chatData.initiatorUser)
          ).data();
          const interlocutorUser: any = await (
            await getDoc(chatData.interlocutorUser)
          ).data();
          const initiatorUserID = initiatorUser.id;
          const interlocutorUserID = interlocutorUser.id;
          if (
            initiatorUserID === interlocutorID ||
            interlocutorUserID === interlocutorID
          ) {
            setChatData(chatData);
          }
        });
      });
    }
  }, []);

  return (
    <div className="chat-component">
      <ChatHeader userName={username || ""} />
      {chatData?.massages.map((massage) => (
        <MassageComponent key={massage.id} massage={massage} />
      ))}
      <div className="grow"></div>
      <MassageInput />
    </div>
  );
};
