import React from "react";
import styled from "styled-components";
import Sidenav from "../../components/sidenav/Sidenav";
import ChatDetail from "../detail/ChatDetail";
import devices from "../../utils/devices";
import { useAppHooks } from "../../contexts";

const HomePageStyle = styled.div`
  width: 100%;
  max-height: 100vh;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 30% 70%;
  z-index: 0;

  @media ${devices.tablet} {
    grid-template-columns: 40% 60%;
  }

  @media ${devices.tablet} {
    grid-template-columns: 35% 65%;
  }

  @media ${devices.mobileL} {
    width: 200vw;
    position: absolute;
    display: grid;
    grid-template-columns: 50% 50%;
    left: 0;
    transform: translateX(${props => (props.isSelected ? -100 : 0)}vw);
    transition: all 600ms ease-in;
  }
`;

const HomePage = () => {
  const { useTransition } = useAppHooks();
  const [{ chatSelected }, _] = useTransition;

  return (
    <HomePageStyle isSelected={chatSelected}>
      <Sidenav />
      <ChatDetail />
    </HomePageStyle>
  );
};

export default HomePage;
