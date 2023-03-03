import { Card } from "@blueprintjs/core";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
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

  const getData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot;
  }, []);

  const dataSnap = getData();

  useEffect(() => {
    if (searchText.length > 0) {
      setOpen(true);
      dataSnap
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
          <ChatListButton />
        </>
      )}
    </div>
  );
};
