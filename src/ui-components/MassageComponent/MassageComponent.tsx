import { Card } from "@blueprintjs/core";
import { FC } from "react";
import { IMassage } from "../../types";
import "./MassageComponent.scss";

interface IMassageComponent {
  massage: IMassage;
}

export const MassageComponent: FC<IMassageComponent> = (props) => {
  const { massage }: IMassageComponent = { ...defaultProps, ...props };

  return (
    <Card className="massage-card">
      <span className="massage-card_content">{massage.content}</span>
      <span className="massage-card_date">{massage.date}</span>
    </Card>
  );
};

const defaultProps: Required<IMassageComponent> = {
  massage: { content: "", status: "", date: "", sender: { name: "" } },
};
