import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageForm from "../forms/MessageForm";
import MessageList from "../messages/MessageList";
import ChatHeader from "../header/ChatHeader";
import Dropdown from "../dropdown/Dropdown";
import DropdownItem from "../dropdown/DropdownItem";
import { useAppHooks } from "../../contexts";
import devices from "../../utils/devices";

const ChatStyle = styled.div`
  background-image: linear-gradient(75deg, rgba(215, 215, 215, 0.06) 0%, rgba(215, 215, 215, 0.06) 50%,rgba(67, 67, 67, 0.06) 50%, rgba(67, 67, 67, 0.06) 100%),linear-gradient(123deg, rgba(236, 236, 236, 0.1) 0%, rgba(236, 236, 236, 0.1) 50%,rgba(116, 116, 116, 0.1) 50%, rgba(116, 116, 116, 0.1) 100%),linear-gradient(152deg, rgba(136, 136, 136, 0.06) 0%, rgba(136, 136, 136, 0.06) 50%,rgba(145, 145, 145, 0.06) 50%, rgba(145, 145, 145, 0.06) 100%),linear-gradient(278deg, rgba(9, 9, 9, 0.06) 0%, rgba(9, 9, 9, 0.06) 50%,rgba(37, 37, 37, 0.06) 50%, rgba(37, 37, 37, 0.06) 100%),linear-gradient(353deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 50%,rgba(167, 167, 167, 0.05) 50%, rgba(167, 167, 167, 0.05) 100%),linear-gradient(319deg, rgba(228, 228, 228, 0.06) 0%, rgba(228, 228, 228, 0.06) 50%,rgba(14, 14, 14, 0.06) 50%, rgba(14, 14, 14, 0.06) 100%),linear-gradient(3deg, rgba(145, 145, 145, 0.07) 0%, rgba(145, 145, 145, 0.07) 50%,rgba(216, 216, 216, 0.07) 50%, rgba(216, 216, 216, 0.07) 100%),linear-gradient(161deg, rgba(211, 211, 211, 0.02) 0%, rgba(211, 211, 211, 0.02) 50%,rgba(194, 194, 194, 0.02) 50%, rgba(194, 194, 194, 0.02) 100%),linear-gradient(307deg, rgba(200, 200, 200, 0.08) 0%, rgba(200, 200, 200, 0.08) 50%,rgba(117, 117, 117, 0.08) 50%, rgba(117, 117, 117, 0.08) 100%),linear-gradient(90deg, rgb(48, 195, 152),rgb(3, 109, 68));
  width: auto;
  position: relative;
  overflow: hidden;
  max-height: 100vh;
  overflow: hidden;

  @media ${devices.mobileL} {
    width: 100vw;
  }
`;

const NoChatStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Chat = () => {
  const { useTransition, socket } = useAppHooks();

  const [{ chatSelected }, _] = useTransition;

  const [chat, setChat] = useState(null);
  const [y, setY] = useState(0);
  const [isDisplayed, setDisplay] = useState(false);

  const getHeaderPosition = (isDisplayed, y) => {
    setDisplay(isDisplayed);
    setY(y);
  };

  useEffect(() => {
    if (!chat && !chatSelected) {
      socket.on("fetch-chat", chatFetched => {
        setChat(chatFetched);
      });
    }
  }, [chat, chatSelected, socket]);

  return (
    <ChatStyle>
      {chat ? (
        <div>
          <ChatHeader
            getHeaderPosition={getHeaderPosition}
            isDisplayed={isDisplayed}
            chat={chat}
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
          <MessageForm chatId={chat.id} />
        </div>
      ) : (
        <NoChatStyle>
          Select a chat or create one by choosing one of your contact
        </NoChatStyle>
      )}
    </ChatStyle>
  );
};

export default Chat;
