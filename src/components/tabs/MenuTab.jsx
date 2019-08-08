import React, { useState } from "react";
import styled from "styled-components";
import Users from "../users/Users";
import Chats from "../chats/Chats";
import ContactsTab from "./ContactTab";
import ChatsTab from "./ChatTab";
import Friends from "../friends/Friends";

const TabStyle = styled.li`
  width: 100%;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
  padding: 2px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isSelected && "white"};
  color: ${props => props.isSelected && "black"};
  transition: all 300ms ease-in;
`;

const NavStyle = styled.ul`
  display: flex;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  list-style: none;
  flex: 1 auto;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const PaneStyle = styled.div`
  width: 100%;
  padding: 5px 0px;
`;

const MenuTabStyle = styled.div`
  display: block;
  width: 100%;
  border-radius: 10px;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
`;

const MenuTab = () => {
  const [tab, setTab] = useState(0);

  return (
    <MenuTabStyle>
      <NavStyle>
        <TabStyle isSelected={tab === 0} onClick={() => setTab(0)}>
          <ChatsTab />
        </TabStyle>
        <TabStyle isSelected={tab === 1} onClick={() => setTab(1)}>
          <ContactsTab />
        </TabStyle>
      </NavStyle>
      <PaneStyle>
        {tab === 0 && <Chats />}
        {tab === 1 && <Friends />}
      </PaneStyle>
    </MenuTabStyle>
  );
};

export default MenuTab;
