import { Card } from "@blueprintjs/core";
import { FC, useEffect, useState } from "react";
import { ChatListButton, SearchComponent } from "../../ui-components";
import "./ChatsList.scss";

export const ChatsList: FC = () => {
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <div className="chats-list">
      <SearchComponent
        onChange={(value) => {
          setSearchText(value);
        }}
      />
      <ChatListButton />
    </div>
  );
};
