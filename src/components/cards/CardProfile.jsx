import React from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import { DISCONNECT } from "../../reducers/authReducer";
import LogoutIcon from "../icons/LogoutIcon";

const CardProfileStyle = styled.div`
  height: 60px;
  padding: 20px 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .8), -2px -2px 4px rgba(0, 0, 0, .8);
  display: flex;
  align-items: center;

  & .img-card {
    width: 55px;
    line-height: 40px;
    border-radius: 50%;
    border: 2px solid ${props => props.imgBg.color};
    height: 50px;
    text-align: center;
    font-size: 2em;
    cursor: pointer;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
    padding: 0px 4px;
  }

  & .name-card {
    width: 100%;
    margin: 0 0 0 20px;
    padding: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }

  & .logout-card {
    margin-left: auto;
    cursor: pointer;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }
`;

const statusArray = [
  { status: "online", color: "#2ecc71" },
  { status: "offline", color: "#95a5a6" },
  { status: "busy", color: "#e74c3c" },
  { status: "away", color: "#f1c40f" }
];

const CardProfile = () => {
  const { useAuth } = useAppHooks();
  const [{ user }, dispatch] = useAuth;

  const [imgBg, _] = React.useState(statusArray[0]);

  const handleClick = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("chat_token");
      dispatch({ type: DISCONNECT });
    } catch (error) {
      alert("Oups, something wrong!!!");
    }
  };

  return (
    user && (
      <CardProfileStyle imgBg={imgBg}>
        <span className="img-card">{user.name[0].toUpperCase()}</span>
        <h3 className="name-card">{user.name}</h3>
        <LogoutIcon className="logout-card" handleClick={handleClick} />
      </CardProfileStyle>
    )
  );
};

export default CardProfile;
