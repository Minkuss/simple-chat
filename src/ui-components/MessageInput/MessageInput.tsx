import { InputGroup } from "@blueprintjs/core";
import { FC, useState } from "react";
import "./MessageInput.scss";

interface IMassageInput {
  onSubmit: (value: string) => unknown;
}

export const MassageInput: FC<IMassageInput> = (props) => {
  const { onSubmit }: IMassageInput = { ...defaultProps, ...props };
  const [inputText, setInputText] = useState("");

  return (
    <div className="massage-input">
      <input
        onKeyDown={(key) => {
          if (key.key === "Enter") {
            onSubmit(inputText);
            setInputText("");
          }
        }}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Hello"
        className="massage-input_input"
        type="text"
        value={inputText}
      />
    </div>
  );
};

const defaultProps: Required<IMassageInput> = {
  onSubmit: () => {},
};
