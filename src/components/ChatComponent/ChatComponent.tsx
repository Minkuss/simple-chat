import { Card } from "@blueprintjs/core";
import {
  collection,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../main";
import { IChat, IMassage } from "../../types";
import { MassageComponent, MassageInput } from "../../ui-components";
import { ChatHeader } from "../../ui-components/ChatHeader/ChatHeader";
import "./ChatComponent.scss";

export const ChatComponent: FC = () => {
  const user = useAuth();

  const { username } = useParams();
  const location = useLocation();
  const { interlocutorID } = location.state;
  const [chatData, setChatData] = useState<IChat>();
  const [massageText, setMassageText] = useState("");

  useEffect(() => {
    if (user) {
      const doc2 = doc;
      onSnapshot(doc2(db, "users", user.uid), (doc) => {
        doc.data()?.chats.map(async (el: any) => {
          const chatData: any = (await getDoc(el)).data();
          onSnapshot(doc2(db, "chats", chatData.id), async (doc) => {
            // subscribing to chatData changes
            const chat: any = doc.data();
            const initiatorUser: any = await (
              await getDoc(chat.initiatorUser)
            ).data();
            const interlocutorUser: any = await (
              await getDoc(chat.interlocutorUser)
            ).data();
            const initiatorUserID = initiatorUser.id;
            const interlocutorUserID = interlocutorUser.id;
            if (
              initiatorUserID === interlocutorID ||
              interlocutorUserID === interlocutorID
            ) {
              setChatData(chat);
            }
          });
        });
      });
    }
  }, [user]);

  useEffect(() => {
    if (massageText !== "" && user) {
      const doc2 = doc;
      onSnapshot(doc2(db, "users", user.uid), (doc) => {
        doc.data()?.chats.map(async (el: any) => {
          const chatData: any = (await getDoc(el)).data();
          const user: any = await (await getDoc(doc.ref)).data();
          const newMassage: IMassage = {
            content: massageText,
            date: new Date(),
            id: nanoid(),
            sender: doc.ref,
            status: "unchecked",
          };
          chatData.massages.push(newMassage);
          await updateDoc(doc2(db, "chats", chatData.id), {
            massages: chatData.massages,
          });
        });
      });
    }
  }, [massageText]);

  return (
    <div className="chat-component">
      <ChatHeader userName={username || ""} />
      <div className="chat-component_massages-list">
        {chatData?.massages.map((massage) => (
          <MassageComponent key={massage.id} massage={massage} />
        ))}
      </div>
      <div className="grow"></div>
      <MassageInput
        onSubmit={(value) => {
          setMassageText(value);
        }}
      />
    </div>
  );
};
