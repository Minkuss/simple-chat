import { InputGroup } from "@blueprintjs/core";
import { FC } from "react";
import "./MassageInput.scss";

export const MassageInput: FC = () => {
  return (
    <div className="massage-input">
      <input placeholder="Hello" className="massage-input_input" type="text" />
    </div>
  );
};
