import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import {
  AUTH_FAILED,
  RESET_ERROR,
  CONNECTED
} from "../../reducers/authReducer";
import EmailInput from "../inputs/EmailInput";
import PwdInput from "../inputs/PwdInput";
import api from "../../api";
import storeToken from "../../utils/storeToken";
import axios from "axios";

const FormStyle = styled.form`
  padding: 0 10px 20px;
  display: flex;
  flex-direction: column;

  & span {
    margin: 10px 0;
  }
`;

const LabelStyle = styled.label`
  margin-right: 10px;
`;

const ButtonStyle = styled.button`
  background-color: forestgreen;
  color: white;
  margin-top: 15px;
  border-radius: 5px;
  padding: 3px;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
`;

const LoginForm = () => {
  const { useAuth, history } = useAppHooks();
  const [{ error, isConnected }, dispatch] = useAuth;

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorLogin, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (email && password) {
        const res = await api.user.login(email, password);
        storeToken(res);
        dispatch({ type: CONNECTED });

        setEmail(null);
        setPassword(null);
      } else if (!email) {
        setError({ code: "email", message: "Username is required" });
      } else if (!password) {
        setError({ code: "password", message: "Password is required" });
      }
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: AUTH_FAILED,
        payload: error.response.data
      });
    }
  };

  useEffect(() => {
    if (error) setError(error);
    return () => dispatch({ type: RESET_ERROR });
  }, [error, dispatch]);

  useEffect(() => {
    if (errorLogin) {
      if (errorLogin.email) {
        alert(errorLogin.email);
      } else if (errorLogin.password) {
        alert(errorLogin.password);
      } else if (errorLogin.msg) {
        alert(errorLogin.msg);
      }
    }
    return () => setError(null);
  }, [errorLogin]);

  useEffect(() => {
    if (isConnected) {
      history.replace("/");
    }
  }, [isConnected, history]);

  return (
    <FormStyle onSubmit={handleSubmit}>
      <span>
        <LabelStyle>Email</LabelStyle>
        <EmailInput
          value={email}
          name="email"
          placeholder="Type your email"
          handleChange={setEmail}
        />
      </span>
      <span>
        <LabelStyle>Password</LabelStyle>
        <PwdInput
          value={password}
          name="password"
          placeholder="Type your password"
          handleChange={setPassword}
        />
      </span>
      <ButtonStyle type="submit">Log in</ButtonStyle>
    </FormStyle>
  );
};

export default LoginForm;
