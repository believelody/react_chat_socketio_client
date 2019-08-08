import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import {
  SET_CURRENT_PROFILE,
  AUTH_FAILED,
  RESET_ERROR,
  CONNECTED
} from "../../reducers/authReducer";
import TextInput from "../inputs/TextInput";
import PwdInput from "../inputs/PwdInput";
import api from "../../api";

const FormStyle = styled.form`
  padding: 0 10px 20px;
  display: flex;
  flex-direction: column;
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
        await api.user.login(email, password);
        dispatch({ type: CONNECTED });

        setEmail(null);
        setPassword(null);
      } else if (!email) {
        setError({ code: "email", message: "Username is required" });
      } else if (!password) {
        setError({ code: "password", message: "Password is required" });
      }
    } catch (error) {
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
      alert(errorLogin.message);
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
        <LabelStyle>Username</LabelStyle>
        <TextInput
          value={email}
          name="email"
          placeholder="Type your email"
          handleChange={setEmail}
        />
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
