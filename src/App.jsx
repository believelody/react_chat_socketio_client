import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import AuthRoute from "./components/auth-routes/AuthRoute";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import HomePage from "./pages/home/HomePage";
import devices from "./utils/devices";
import Modal from "./components/modal/Modal";
import ChatDetail from "./pages/detail/ChatDetail";
import { useAppHooks } from "./contexts";
import api from "./api";
import UserPage from "./pages/user/UserPage";

const AppStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(102deg, rgba(249, 249, 249, 0.1) 0%, rgba(249, 249, 249, 0.1) 14%,rgba(161, 161, 161, 0.1) 14%, rgba(161, 161, 161, 0.1) 100%),linear-gradient(310deg, rgba(26, 26, 26, 0.03) 0%, rgba(26, 26, 26, 0.03) 71%,rgba(189, 189, 189, 0.03) 71%, rgba(189, 189, 189, 0.03) 100%),linear-gradient(133deg, rgba(132, 132, 132, 0.1) 0%, rgba(132, 132, 132, 0.1) 8%,rgba(95, 95, 95, 0.1) 8%, rgba(95, 95, 95, 0.1) 100%),linear-gradient(142deg, rgba(110, 110, 110, 0.03) 0%, rgba(110, 110, 110, 0.03) 46%,rgba(8, 8, 8, 0.03) 46%, rgba(8, 8, 8, 0.03) 100%),linear-gradient(346deg, rgba(231, 231, 231, 0.05) 0%, rgba(231, 231, 231, 0.05) 6%,rgba(71, 71, 71, 0.05) 6%, rgba(71, 71, 71, 0.05) 100%),linear-gradient(118deg, rgba(251, 251, 251, 0.07) 0%, rgba(251, 251, 251, 0.07) 72%,rgba(24, 24, 24, 0.07) 72%, rgba(24, 24, 24, 0.07) 100%),linear-gradient(338deg, rgba(75, 75, 75, 0.08) 0%, rgba(75, 75, 75, 0.08) 37%,rgba(213, 213, 213, 0.08) 37%, rgba(213, 213, 213, 0.08) 100%),linear-gradient(90deg, rgb(199, 202, 132),rgb(25, 94, 125));
  background-color: #e6eaea;
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  letter-spacing: 0.1px;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  -webkit-font-smoothing: antialiased;
  position: relative;

  @media ${devices.mobileL} {
    width: 100vw;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <AppStyle>
        <Switch>
          <AuthRoute exact path="/" component={HomePage} />
          <AuthRoute exact path="/chats/:id" component={ChatDetail} />
          <AuthRoute exact path="/search-users" component={UserPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
        <Modal />
      </AppStyle>
    </BrowserRouter>
  );
};

export default App;
