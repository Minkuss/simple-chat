import { DocumentReference } from "firebase/firestore";

export interface IUser {
  name: string;
  email: string;
  chats: IChat[];
  id: string
}

export interface IChat {
  initiatorUser: DocumentReference;
  interlocutorUser: DocumentReference;
  messages: IMessage[];
  id: string;
}

export interface IMessage {
  content: string;
  status: string;
  date: any;
  sender: DocumentReference<unknown>;
  id: string
}