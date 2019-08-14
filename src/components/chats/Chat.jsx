import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageForm from "../forms/MessageForm";
import MessageList from "../messages/MessageList";
import ChatHeader from "../header/ChatHeader";
import Dropdown from "../dropdown/Dropdown";
import DropdownItem from "../dropdown/DropdownItem";
import { useAppHooks } from "../../contexts";
import devices from "../../utils/devices";
import api from "../../api";
import NotFriend from "../friends/NotFriend";

const ChatStyle = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 100vh;

  @media ${devices.mobileL} {
    width: 100vw;
  }
`;

const Chat = ({ id }) => {
  const { useTransition, useAuth } = useAppHooks();
  const [{user}, dispatchAuth] = useAuth
  const [{ chatSelected }, _] = useTransition;

  const [chat, setChat] = useState(null);
  const [y, setY] = useState(0);
  const [isDisplayed, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  const getHeaderPosition = (isDisplayed, y) => {
    setDisplay(isDisplayed);
    setY(y);
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.chat.getChat(id)
        setChat(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    if (!chat) fetchChat()
  }, [chat, id]);
 
  return (
    <ChatStyle>
      {
        loading && <h3>Loading...</h3>
      }
      {
        !loading && !chat && <h3>Error while fetching</h3>
      }
      {!loading && chat && (
        <div>
          <ChatHeader
            getHeaderPosition={getHeaderPosition}
            isDisplayed={isDisplayed}
            users={chat.users.filter(u => u.name !== user.name)}
          />
          <Dropdown
            propsY={y}
            isDisplayed={isDisplayed}
            handleDropdown={setDisplay}
          >
            <DropdownItem
              handleClick={() => setDisplay(false)}
              text="Add User to Chat"
            />
          </Dropdown>
          <MessageList messages={chat.messages} users={chat.users} />
          {chat.users.length < 3 && <NotFriend contact={chat.users.find(u => u.name !== user.name)} />}
          <MessageForm chatId={chat.id} />
        </div>
      )}
    </ChatStyle>
  );
};

export default Chat;
