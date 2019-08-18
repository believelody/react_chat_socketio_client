import React from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import NoChat from "../../components/chats/NoChat";

const HomePageStyle = styled.div`
  position: relative;
`

const HomePage = ({ match }) => {
  const { useTransition } = useAppHooks();
  const [{ chatSelected }, _] = useTransition;
  
  return (
    <HomePageStyle>
      <NoChat />
    </HomePageStyle>
  );
};

export default HomePage;
