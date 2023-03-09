import { DocumentData } from "firebase/firestore";
import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./ChatListButton.scss";

interface IChatListButton {
  userData?: DocumentData;
  onClick?: (value: any) => unknown;
}

export const ChatListButton: FC<IChatListButton> = (props) => {
  const { userData, onClick }: IChatListButton = {
    ...defaultProps,
    ...props,
  };

  return (
    <NavLink onClick={onClick} style={{ textDecoration: "none" }} to={""}>
      <div className="chat-list-box">
        <img
          className="chat-list-box_user-photo"
          src={userData.photoUrl}
          alt="User_photo"
          width={"60px"}
          height={"60px"}
        />
        <div className="chat-list-box_spans">
          <span className="chat-list-box_header">{userData.name}</span>
          <span className="chat-list-box_msg">{userData.lastMassage}</span>
        </div>
        <div className="grow"></div>
        <span className="chat-list-box_date">{userData.date}</span>
      </div>
    </NavLink>
  );
};

const defaultProps: Required<IChatListButton> = {
  userData: {},
  onClick: () => {},
};
