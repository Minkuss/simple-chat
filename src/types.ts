export interface IUser {
  name: string;
}

export interface IChat {
  users: IUser[];
  massages: IMassage[]
}

export interface IMassage {
  content: string;
  status: string;
  date: string;
  sender: IUser;
}