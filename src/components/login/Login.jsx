import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../forms/LoginForm";

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-image: linear-gradient(135deg, rgb(22, 114, 105) 0%, rgb(22, 114, 105) 50%,rgb(89, 171, 135) 50%, rgb(89, 171, 135) 57%,rgb(67, 152, 125) 57%, rgb(67, 152, 125) 74%,rgb(44, 133, 115) 74%, rgb(44, 133, 115) 76%,rgb(134, 209, 155) 76%, rgb(134, 209, 155) 84%,rgb(156, 228, 165) 84%, rgb(156, 228, 165) 91%,rgb(111, 190, 145) 91%, rgb(111, 190, 145) 100%);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

  & h4 {
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 10px;
    width: 100%;
    text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
  }

  & a {
    color: black;
    padding-bottom: 5px;
    font-style: oblique;
    font-size: 0.8em;
  }
`;

const Login = () => {
  return (
    <LoginStyle>
      <h4>Connect to Chat</h4>
      <LoginForm />
      <Link to="/register">Not among us? Create an account</Link>
    </LoginStyle>
  );
};

export default Login;
