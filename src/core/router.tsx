import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatComponent, EmptyChatComponent } from "../components";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";

export const CoreRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />}>
          <Route path="chat/:username" element={<ChatComponent />} />
          <Route path="/main" element={<EmptyChatComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
