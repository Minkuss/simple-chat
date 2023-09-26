import { Card, H2, Label } from "@blueprintjs/core";
import { DocumentReference, Firestore, getDoc } from "firebase/firestore";
import { FC, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { IMessage, IUser } from "../../types";
import "./MessageComponent.scss";

interface IMessageComponent {
  message: IMessage;
}

export const MessageComponent: FC<IMessageComponent> = (props) => {
  const user = useAuth();

  const { message }: IMessageComponent = { ...defaultProps, ...props };
  const messageDate = new Date(message.date.toMillis());
  const [sender, setSender] = useState<IUser>();

  const getSender = useCallback(async () => {
    const sender: any = (await getDoc(message.sender)).data();
    setSender(sender);
  }, []);

  useEffect(() => {
    getSender();
  }, []);

  return (
    <>
      <Card
        style={
          sender?.name === user?.displayName
            ? { alignSelf: "flex-end" }
            : { alignSelf: "flex-start" }
        }
        className="message-card"
      >
        <span className="message-card_content">{message.content}</span>
        <span className="message-card_date">
          {String(messageDate.getHours()) +
            ":" +
            String(messageDate.getMinutes()).padStart(2, "0")}
        </span>
      </Card>
    </>
  );
};

const defaultProps: Required<IMessageComponent> = {
  message: {
    content: "",
    status: "",
    date: "",
    sender: {},
    id: "",
  },
};
