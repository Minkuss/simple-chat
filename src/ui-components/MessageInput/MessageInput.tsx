import { InputGroup } from "@blueprintjs/core";
import { FC, useState } from "react";
import "./MessageInput.scss";

interface IMessageInput {
  onSubmit: (value: string) => unknown;
}

export const MessageInput: FC<IMessageInput> = (props) => {
  const { onSubmit }: IMessageInput = { ...defaultProps, ...props };
  const [inputText, setInputText] = useState("");

  return (
    <div className="message-input">
      <input
        onKeyDown={(key) => {
          if (key.key === "Enter") {
            onSubmit(inputText);
            setInputText("");
          }
        }}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Hello"
        className="message-input_input"
        type="text"
        value={inputText}
      />
    </div>
  );
};

const defaultProps: Required<IMessageInput> = {
  onSubmit: () => {},
};
