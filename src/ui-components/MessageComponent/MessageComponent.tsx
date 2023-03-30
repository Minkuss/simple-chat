import { Card, H2, Label } from "@blueprintjs/core";
import { getDoc } from "firebase/firestore";
import { FC, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { IMassage, IUser } from "../../types";
import "./MessageComponent.scss";

interface IMassageComponent {
  massage: IMassage;
}

export const MassageComponent: FC<IMassageComponent> = (props) => {
  const user = useAuth();

  const { massage }: IMassageComponent = { ...defaultProps, ...props };
  const massageDate = new Date(massage.date.toMillis());
  const [sender, setSender] = useState<IUser>();

  const getSender = useCallback(async () => {
    const sender: any = (await getDoc(massage.sender)).data();
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
        className="massage-card"
      >
        <span className="massage-card_content">{massage.content}</span>
        <span className="massage-card_date">
          {String(massageDate.getHours()) +
            ":" +
            String(massageDate.getMinutes()).padStart(2, "0")}
        </span>
      </Card>
    </>
  );
};

const defaultProps: Required<IMassageComponent> = {
  massage: {
    content: "",
    status: "",
    date: "",
    id: "",
    sender: { name: "", email: "", id: "", chats: [] },
  },
};
