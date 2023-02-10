import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./ChatListButton.scss";

export const ChatListButton: FC = () => {
  const auth = useContext(AuthContext).auth;

  return (
    <NavLink style={{ textDecoration: "none" }} to={""}>
      <div className="chat-list-box">
        <img
          className="chat-list-box_user-photo"
          src={
            // its should be sender's photo
            auth.currentUser?.photoURL != null ? auth.currentUser?.photoURL : ""
          }
          alt="User_photo"
          width={"50px"}
        />
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="chat-list-box_spans"
        >
          <span className="chat-list-box_header">Name</span>
          <span className="chat-list-box_msg">Hello</span>
        </div>
        <span className="chat-list-box_date">date</span>
      </div>
    </NavLink>
  );
};
