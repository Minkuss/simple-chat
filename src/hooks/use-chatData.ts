import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../main";
import { IMessage, IUser } from "../types";
import { useUserID } from "./use-userID";

export function useChatData() {
  const userID = useUserID();
  const [userData, setUserData] = useState<DocumentData[]>([]);

  const uncheckedMsgCounter = useCallback((chatData: any) => {
    return chatData.messages.filter((message: IMessage) => 
      message.sender.path !== `users/${userID}` && message.status === "unchecked"
    )
  }, [userID])

  useEffect(() => {
    const doc2 = doc;
    if (!userID) {
      return;
    }
    onSnapshot(doc2(db, "users", userID), (doc) => {
      const userData: any = doc.data();
      const userChats = userData.chats;

      userChats.forEach(async (chatReference: any) => {
        const chatData: any = (await getDoc(chatReference)).data();
        onSnapshot(doc2(db, "chats", chatData.id), async (doc) => {
          const chatData: any = doc.data();
          const interlocutorData: any = (
            await getDoc(chatData.interlocutorUser)
          ).data();
          const initiatorData: any = (
            await getDoc(chatData.initiatorUser)
          ).data();
          const companionData =
            interlocutorData.id !== userID ? interlocutorData : initiatorData;
          const lastMessageDate = new Date(
            chatData.messages.length !== 0
              ? chatData.messages[chatData.messages.length - 1].date.toMillis()
              : 0
          );
          let newUserData = {
            photoUrl: companionData.photoUrl,
            name: companionData.name,
            lastMessage:
              chatData.messages.length !== 0
                ? chatData.messages[chatData.messages.length - 1].content
                : "",
            chatID: chatData.id,
            id: companionData.id,
            date:
              chatData.messages.length !== 0
                ? String(lastMessageDate.getHours()) +
                  ":" +
                  String(lastMessageDate.getMinutes()).padStart(2, "0")
                : "",
            uncheckedMsgCount: uncheckedMsgCounter(chatData).length
          };
          setUserData((prevState) => {
            prevState.forEach((el: DocumentData) => {
              if (el.name === newUserData.name) {
                const index = prevState.indexOf(el);
                prevState[index] = newUserData;
                newUserData = {
                  photoUrl: "",
                  name: "",
                  lastMessage: "",
                  chatID: "",
                  id: "",
                  date: "",
                  uncheckedMsgCount: 0,
                };
              }
            });
            if (newUserData.name !== "") {
              const newChats: DocumentData[] = [...prevState, newUserData];
              return newChats;
            } else {
              const newChats: DocumentData[] = [...prevState];
              return newChats;
            }
          });
        });
      });
    });
  }, [userID])
  return userData
}