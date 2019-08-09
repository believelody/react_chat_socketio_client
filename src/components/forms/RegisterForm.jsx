import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { SET_CURRENT_PROFILE, AUTH_FAILED, CONNECTED } from "../../reducers/authReducer";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import PwdInput from "../inputs/PwdInput";
import api from "../../api";
import storeToken from "../../utils/storeToken";

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

const RegisterForm = () => {
  const { useAuth, history } = useAppHooks();
  const [{ error, isConnected }, dispatch] = useAuth;

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorRegister, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (email && password) {
        const res = await api.user.register(username, email, password);
        storeToken(res)
        dispatch({ type: CONNECTED });

        setUsername(null)
        setEmail(null);
        setPassword(null);
      } else if (!email) {
        setError({ code: "email", message: "Username is required" });
      } else if (!password) {
        setError({ code: "password", message: "Password is required" });
      } else if (!username) {
        setError({ code: "username", message: "Username is required" });
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
  }, [error]);

  useEffect(() => {
    if (errorRegister) {
      if (errorRegister.email) {
        alert(errorRegister.email);
      }
      else if (errorRegister.password) {
        alert(errorRegister.password);
      }
      else if (errorRegister.msg) {
        alert(errorRegister.msg);
      }
    }
  }, [errorRegister]);

  useEffect(() => {
    if (isConnected) {
      history.replace("/");
    }
  }, [isConnected]);

  return (
    <FormStyle onSubmit={handleSubmit}>
      <span>
        <LabelStyle>Username</LabelStyle>
        <TextInput
          value={username}
          name="username"
          placeholder="Type your username"
          handleChange={setUsername}
        />
      </span>
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
      <ButtonStyle type="submit">Create user</ButtonStyle>
    </FormStyle>
  );
};

export default RegisterForm;
