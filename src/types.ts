import { DocumentReference } from "firebase/firestore";

export interface IUser {
  name: string;
  email: string;
  chats: IChat[];
  id: string
}

export interface IChat {
  users: IUser[];
  massages: IMassage[]
  id: string
}

export interface IMassage {
  content: string;
  status: string;
  date: any;
  sender: DocumentReference<unknown>;
  id: string
}