import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MessageComponent, MessageInput } from "../../ui-components";
import { ChatHeader } from "../../ui-components/ChatHeader/ChatHeader";
import "./ChatComponent.scss";
import { useChatComponentData } from "../../hooks/use-chatComponentData";

export const ChatComponent: FC = () => {
  const { username } = useParams();
  const location = useLocation();
  const { interlocutorID } = location.state;

  const chatData = useChatComponentData(username, interlocutorID).chatData;
  const addNewMessage = useChatComponentData(
    username,
    interlocutorID
  ).addNewMessage;

  return (
    <div className="chat-component">
      <ChatHeader userName={username || ""} />
      <div className="chat-component_messages-list">
        {chatData?.messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
      <div className="grow"></div>
      <MessageInput
        onSubmit={(value) => {
          addNewMessage(value);
        }}
      />
    </div>
  );
};
