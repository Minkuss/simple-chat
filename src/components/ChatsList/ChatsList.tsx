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

  useEffect(() => {
    if (userID) {
      const doc2 = doc;
      onSnapshot(doc2(db, "users", userID), (doc) => {
        doc.data()?.chats.map(async (el: any) => {
          const chatData: any = (await getDoc(el)).data();
          onSnapshot(doc2(db, "chats", chatData.id), async (doc) => {
            // subscribing to chatData changes
            const chat: any = doc.data();
            const interlocutorData: any = await (
              await getDoc(chat.interlocutorUser)
            ).data();
            const initiatorData: any = await (
              await getDoc(chat.initiatorUser)
            ).data();
            if (chat.messages.length !== 0) {
              const lastMessageDate = new Date(
                chat.messages[chat.messages.length - 1].date.toMillis()
              );
              setUserData((prevState) => {
                const newChats: DocumentData[] = [
                  ...prevState,
                  interlocutorData.id !== userID
                    ? {
                        photoUrl: interlocutorData.photoUrl,
                        name: interlocutorData.name,
                        lastMessage:
                          chat.messages[chat.messages.length - 1].content,
                        chatID: chat.id,
                        id: interlocutorData.id,
                        date:
                          String(lastMessageDate.getHours()) +
                          ":" +
                          String(lastMessageDate.getMinutes()).padStart(2, "0"),
                      }
                    : {
                        photoUrl: initiatorData.photoUrl,
                        name: initiatorData.name,
                        lastMessage:
                          chat.messages[chat.messages.length - 1].content,
                        chatID: chat.id,
                        id: initiatorData.id,
                        date:
                          String(lastMessageDate.getHours()) +
                          ":" +
                          String(lastMessageDate.getMinutes()).padStart(2, "0"),
                      },
                ];
                return newChats;
              });
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
    getUserChatsData();
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
