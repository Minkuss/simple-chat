import { Card } from "@blueprintjs/core";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { db } from "../../main";
import { ChatListButton, SearchComponent } from "../../ui-components";
import "./ChatsList.scss";

export const ChatsList: FC = () => {
  const auth = useContext(AuthContext).auth;
  const userID = auth.currentUser?.uid;

  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<DocumentData[]>([]);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<DocumentData[]>([]);

  const getUsersData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot;
  }, []);

  const usersDataSnap = getUsersData();

  const getChatsData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "chats"));
    return querySnapshot;
  }, []);

  const chatsDataSnap = getChatsData();

  useEffect(() => {
    if (searchText.length > 0) {
      setOpen(true);
      usersDataSnap
        .then((value) => {
          setResult([]);
          const searchQuery = searchText.toLowerCase();
          value.forEach((doc) => {
            const name: string = doc.data().name.toLowerCase();
            if (name.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
              setResult((prev) => {
                return [...prev, doc.data()];
              });
            }
          });
        })
        .catch((error) => console.log(error));
    } else {
      setResult([]);
      setOpen(false);
    }
  }, [searchText]);

  useEffect(() => {
    if (userID !== undefined) {
      onSnapshot(doc(db, "users", userID), (doc) => {
        // doc.data()?.chats.map(async (el: DocumentData) => {
        //   const interlocutorData: any = await (
        //     await getDoc(el.interlocutor)
        //   ).data();
        //   const newChats: DocumentData[] = [
        //     ...userData,
        //     {
        //       photoUrl: interlocutorData.photoUrl,
        //       name: interlocutorData.name,
        //       lastMassage: el.massages[el.massages.length - 1].content,
        //       chatID: el.id,
        //       interlocutorID: interlocutorData.id,
        //       date: el.massages[el.massages.length - 1].date,
        //     },
        //   ];
        //   setUserData(newChats);
        // });
        doc.data()?.chats.map(async (el: any) => {
          const chatData: any = (await getDoc(el)).data();
          const interlocutorData: any = await (
            await getDoc(chatData.interlocutorUser)
          ).data();
          const lastMassageDate = new Date(
            chatData.massages[chatData.massages.length - 1].date.toMillis()
          );
          const newChats: DocumentData[] = [
            ...userData,
            {
              photoUrl: interlocutorData.photoUrl,
              name: interlocutorData.name,
              lastMassage:
                chatData.massages[chatData.massages.length - 1].content,
              chatID: chatData.id,
              interlocutorID: interlocutorData.id,
              date:
                String(lastMassageDate.getHours()) +
                ":" +
                String(lastMassageDate.getMinutes()).padStart(2, "0"),
            },
          ];
          setUserData(newChats);
        });
      });
    }
  }, [userID]);

  const onSubmit = useCallback((interlocutorID: string) => {
    const chatUsers = {
      user: auth.currentUser?.uid,
      interlocutor: interlocutorID,
    };
  }, []);

  return (
    <div className="chats-list">
      <SearchComponent
        onChange={(value) => {
          setSearchText(value);
        }}
      />
      {open ? (
        <>
          {result.map((el) => (
            <ChatListButton
              onClick={() => onSubmit(el.id)}
              key={el.id}
              userData={el}
            />
          ))}
        </>
      ) : (
        <>
          {userData.map((chat) => (
            <ChatListButton
              key={chat.chatID}
              onClick={() => onSubmit(chat.interlocutorID)}
              userData={chat}
            />
          ))}
        </>
      )}
    </div>
  );
};
