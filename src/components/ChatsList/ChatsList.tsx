import { Card } from "@blueprintjs/core";
import { FC } from "react";
import { ChatListButton, SearchComponent } from "../../ui-components";
import "./ChatsList.scss";

export const ChatsList: FC = () => {
  return (
    <div className="chats-list">
      <SearchComponent />
      <ChatListButton />
    </div>
  );
};
