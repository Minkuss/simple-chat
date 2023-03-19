import { Navbar } from "@blueprintjs/core";
import { FC } from "react";
import "./ChatHeader.scss";

interface IChatHeader {
  userName: string;
}

export const ChatHeader: FC<IChatHeader> = ({ userName }) => {
  return (
    <Navbar className="chat-header">
      <Navbar.Group>
        <Navbar.Heading className="chat-header_heading">
          {userName}
        </Navbar.Heading>
      </Navbar.Group>
    </Navbar>
  );
};
