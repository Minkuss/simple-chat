import { FC, useState } from "react";
import { ChatListButton, SearchComponent } from "../../ui-components";
import "./ChatsList.scss";
import { useChatData } from "../../hooks/use-chatData";
import { useUsersSearch } from "../../hooks/use_users-search";

export const ChatsList: FC = () => {
  const [searchText, setSearchText] = useState("");
  const userData = useChatData();
  const usersSearchData = useUsersSearch(searchText);

  return (
    <div className="chats-list">
      <SearchComponent
        onChange={(value) => {
          setSearchText(value);
        }}
      />
      {usersSearchData.open ? (
        <>
          {usersSearchData.result.map((el) => (
            <ChatListButton key={el.id} userData={el} />
          ))}
        </>
      ) : (
        <>
          {userData.map((chat) => (
            <ChatListButton key={chat.chatID} userData={chat} />
          ))}
        </>
      )}
    </div>
  );
};
