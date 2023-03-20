import { H1 } from "@blueprintjs/core";
import { FC } from "react";
import "./EmptyChatComponent.scss";

export const EmptyChatComponent: FC = () => {
  return (
    <div className="empty-chat">
      <H1 className="empty-chat_h1">Choose chat</H1>
    </div>
  );
};
