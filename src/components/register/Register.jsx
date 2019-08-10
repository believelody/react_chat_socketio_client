import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RegisterForm from "../forms/RegisterForm";

const RegisterStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-image: linear-gradient(45deg, rgb(182, 217, 185) 0%, rgb(182, 217, 185) 7%,rgb(148, 203, 178) 7%, rgb(148, 203, 178) 16%,rgb(80, 177, 166) 16%, rgb(80, 177, 166) 18%,rgb(46, 163, 159) 18%, rgb(46, 163, 159) 26%,rgb(114, 190, 172) 26%, rgb(114, 190, 172) 37%,rgb(12, 150, 153) 37%, rgb(12, 150, 153) 100%);
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

const Register = () => {
  return (
    <RegisterStyle>
      <h4>Join Us</h4>
      <RegisterForm />
      <Link to="/login">Already an account?</Link>
    </RegisterStyle>
  );
};

export default Register;
