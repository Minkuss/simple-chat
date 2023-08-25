import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { DocumentReference, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../main";
import { IChat, IMessage } from "../types";
import { nanoid } from "nanoid";

export function useChatComponentData(username: string | undefined, interlocutorID: any) {
  const user = useAuth();
  const [chatData, setChatData] = useState<IChat>();


  useEffect(() => {
    if (user) {
      const doc2 = doc;

      onSnapshot(doc2(db, "users", user.uid), (doc) => {
        doc.data()?.chats.map(async (el: any) => {
          const chatData: any = (await getDoc(el)).data();
          onSnapshot(doc2(db, "chats", chatData.id), async (doc) => {
            // subscribing to chatData changes
            const chat: any = doc.data();
            // getting initiator and interlocutor data objects
            const initiatorUser: any = await (
              await getDoc(chat.initiatorUser)
            ).data();
            const interlocutorUser: any = await (
              await getDoc(chat.interlocutorUser)
            ).data();
            const initiatorUserID = initiatorUser.id;
            const interlocutorUserID = interlocutorUser.id;
            if (
              // checking coincidences, interlocutorID is ID of user's interlocutor
              (initiatorUserID === interlocutorID ||
                interlocutorUserID === interlocutorID) &&
              (initiatorUser.name === username ||
                interlocutorUser.name === username)
            ) {
              setChatData(chat);
            }
          });
        });
      });
      setChatData(undefined);
    }
  }, [user, username]);

  const addNewMessage = useCallback(
    async (messageText: string) => {
      if (messageText !== "" && user) {
        const userRef = doc(db, "users", user.uid);
        if (chatData) {
          // set new message if chat exists
          const newMessage: IMessage = {
            content: messageText,
            date: new Date(),
            id: nanoid(),
            sender: userRef,
            status: "unchecked",
          };
          chatData.messages.push(newMessage);
          await setDoc(doc(db, "chats", chatData.id), {
            id: chatData.id,
            initiatorUser: chatData.initiatorUser,
            interlocutorUser: chatData.interlocutorUser,
            messages: chatData.messages,
          });
        } else {
          // "else" create new chat with user's message
          const messages: IMessage[] = [];
          const newChatID = nanoid();

          const newMessage: IMessage = {
            content: messageText,
            date: new Date(),
            id: nanoid(),
            sender: userRef,
            status: "unchecked",
          };
          messages.push(newMessage);

          const interlocutorRef: DocumentReference = doc(
            db,
            "users",
            interlocutorID
          );

          await setDoc(doc(db, "chats", newChatID), {
            // creating new chat document in collecrion 'chats'
            id: newChatID,
            initiatorUser: userRef,
            interlocutorUser: interlocutorRef,
            messages: messages,
          });

          const newChatRef: DocumentReference = doc(db, "chats", newChatID); // getting the reference of new chat

          await updateDoc(doc(db, "users", user.uid), {
            // updating chats list in user's document
            chats: arrayUnion(newChatRef),
          });

          await updateDoc(doc(db, "users", interlocutorID), {
            // updating chats list in interlocutor's document
            chats: arrayUnion(newChatRef),
          });
        }
      }
    },
    [user, chatData]
  );

  return {chatData, addNewMessage}

}