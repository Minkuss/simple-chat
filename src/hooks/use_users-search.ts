import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../main";

export function useUsersSearch(searchText: string) {
  const [result, setResult] = useState<DocumentData[]>([]);
  const [open, setOpen] = useState(false);

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
  return {open: open, result: result}
}