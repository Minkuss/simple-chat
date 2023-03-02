import { Card } from "@blueprintjs/core";
import { FC } from "react";
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
  return (
    <div className="chat-component">
      <ChatHeader />
      {data.map((massage) => (
        <MassageComponent massage={massage} />
      ))}
      <div className="grow"></div>
      <MassageInput />
    </div>
  );
};
