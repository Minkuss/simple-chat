import { FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatComponent, ChatsList } from "../../components";
import { AuthContext } from "../../context/authContext";
import { useAuthStatus } from "../../hooks/use-auth-status";
import "./MainPage.scss";

export const MainPage: FC = () => {
  const authStatus = useAuthStatus();
  const navigate = useNavigate();
  const auth = useContext(AuthContext).auth;

  useEffect(() => {
    if (authStatus !== "unauthenticated") return;
    navigate("/");
  }, [authStatus, navigate]);

  return (
    <div className="main">
      <ChatsList />
      <ChatComponent />
    </div>
  );
};
