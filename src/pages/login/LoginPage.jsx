import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";
import { useAppHooks } from "../../contexts";

const LoginPageStyle = styled.div`
  margin: 10% 20%;
  padding: 0;
  width: auto;
  height: auto;
`;

const LoginPage = () => {
  const { socket } = useAppHooks()

  socket.emit('purge-chat')
  
  return (
    <LoginPageStyle>
      <Login />
    </LoginPageStyle>
  );
};

export default LoginPage;
