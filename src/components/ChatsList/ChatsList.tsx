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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { db } from "../../main";
import { ChatListButton, SearchComponent } from "../../ui-components";
import "./ChatsList.scss";
import { auth } from "../../main";
import { useUserID } from "../../hooks/use-userID";

export const ChatsList: FC = () => {
  const userID = useUserID();

  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<DocumentData[]>([]);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<DocumentData[]>([]);

  const getUsersData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot;
  }, []);

  const usersDataSnap = getUsersData();

  useEffect(() => {
    if (searchText.length > 0) {
      setOpen(true);
      usersDataSnap
        .then((value) => {
          setResult([]);
          const searchQuery = searchText.toLowerCase();
          value.forEach((doc) => {
            const name: string = doc.data().name.toLowerCase();
            if (
              name.slice(0, searchQuery.length).indexOf(searchQuery) !== -1 &&
              name !== auth.currentUser?.displayName?.toLowerCase()
            ) {
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

  const getUserChatsData = useCallback(() => {
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
  }, [userID]);

  useEffect(() => {
    if (userID) {
      getUserChatsData();
    }
  }, [userID]);

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
            <ChatListButton key={el.id} userData={el} />
          ))}
        </>
      ) : (
        <>
          {userData.map((chat) => (
            <ChatListButton key={chat.chatID} userData={chat} />
          ))}
        </>
      )}
    </div>
  );
};
