import { Card } from "@blueprintjs/core";
import { FC } from "react";
import { IMassage } from "../../types";
import "./MessageComponent.scss";

interface IMassageComponent {
  massage: IMassage;
}

export const MassageComponent: FC<IMassageComponent> = (props) => {
  const { massage }: IMassageComponent = { ...defaultProps, ...props };
  const massageDate = new Date(massage.date.toMillis());

  return (
    <Card className="massage-card">
      <span className="massage-card_content">{massage.content}</span>
      <span className="massage-card_date">
        {String(massageDate.getHours()) +
          ":" +
          String(massageDate.getMinutes()).padStart(2, "0")}
      </span>
    </Card>
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
