import { Navbar } from "@blueprintjs/core";
import { FC } from "react";
import "./ChatHeader.scss";

export const ChatHeader: FC = () => {
  return (
    <Navbar className="chat-header">
      <Navbar.Group>
        <Navbar.Heading className="chat-header_heading">Name</Navbar.Heading>
      </Navbar.Group>
    </Navbar>
  );
};
