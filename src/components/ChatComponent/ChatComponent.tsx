import { Card } from "@blueprintjs/core";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { IMassage } from "../../types";
import { MassageComponent, MassageInput } from "../../ui-components";
import { ChatHeader } from "../../ui-components/ChatHeader/ChatHeader";
import "./ChatComponent.scss";

const data: IMassage[] = [
  {
    content: "Привет",
    status: "checked",
    date: "date",
    sender: { name: "Nick", email: "", chats: [] },
  },
  {
    content: "Пока",
    status: "checked",
    date: "date",
    sender: { name: "Anton", email: "", chats: [] },
  },
];

export const ChatComponent: FC = () => {
  const { username } = useParams();

  return (
    <div className="chat-component">
      <ChatHeader userName={username || ""} />
      {data.map((massage) => (
        <MassageComponent massage={massage} />
      ))}
      <div className="grow"></div>
      <MassageInput />
    </div>
  );
};
