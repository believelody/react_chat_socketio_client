import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import devices from "../../utils/devices";
import TextInput from "../inputs/TextInput";
import { socketEmit, socketOn } from "../../socket";
import chat from "../../api/chat";

const MessageFormStyle = styled.form`
  position: absolute;
  padding: 8px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: grid;
  grid-template-columns: 90% 10%;
  background-image: linear-gradient(231deg, rgba(233, 233, 233, 0.01) 0%, rgba(233, 233, 233, 0.01) 25%,rgba(10, 10, 10, 0.01) 25%, rgba(10, 10, 10, 0.01) 50%,rgba(237, 237, 237, 0.01) 50%, rgba(237, 237, 237, 0.01) 75%,rgba(200, 200, 200, 0.01) 75%, rgba(200, 200, 200, 0.01) 100%),linear-gradient(344deg, rgba(2, 2, 2, 0.03) 0%, rgba(2, 2, 2, 0.03) 20%,rgba(10, 10, 10, 0.03) 20%, rgba(10, 10, 10, 0.03) 40%,rgba(100, 100, 100, 0.03) 40%, rgba(100, 100, 100, 0.03) 60%,rgba(60, 60, 60, 0.03) 60%, rgba(60, 60, 60, 0.03) 80%,rgba(135, 135, 135, 0.03) 80%, rgba(135, 135, 135, 0.03) 100%),linear-gradient(148deg, rgba(150, 150, 150, 0.03) 0%, rgba(150, 150, 150, 0.03) 14.286%,rgba(15, 15, 15, 0.03) 14.286%, rgba(15, 15, 15, 0.03) 28.572%,rgba(74, 74, 74, 0.03) 28.572%, rgba(74, 74, 74, 0.03) 42.858%,rgba(175, 175, 175, 0.03) 42.858%, rgba(175, 175, 175, 0.03) 57.144%,rgba(16, 16, 16, 0.03) 57.144%, rgba(16, 16, 16, 0.03) 71.42999999999999%,rgba(83, 83, 83, 0.03) 71.43%, rgba(83, 83, 83, 0.03) 85.71600000000001%,rgba(249, 249, 249, 0.03) 85.716%, rgba(249, 249, 249, 0.03) 100.002%),linear-gradient(122deg, rgba(150, 150, 150, 0.01) 0%, rgba(150, 150, 150, 0.01) 20%,rgba(252, 252, 252, 0.01) 20%, rgba(252, 252, 252, 0.01) 40%,rgba(226, 226, 226, 0.01) 40%, rgba(226, 226, 226, 0.01) 60%,rgba(49, 49, 49, 0.01) 60%, rgba(49, 49, 49, 0.01) 80%,rgba(94, 94, 94, 0.01) 80%, rgba(94, 94, 94, 0.01) 100%),linear-gradient(295deg, rgba(207, 207, 207, 0.02) 0%, rgba(207, 207, 207, 0.02) 25%,rgba(47, 47, 47, 0.02) 25%, rgba(47, 47, 47, 0.02) 50%,rgba(142, 142, 142, 0.02) 50%, rgba(142, 142, 142, 0.02) 75%,rgba(76, 76, 76, 0.02) 75%, rgba(76, 76, 76, 0.02) 100%),linear-gradient(73deg, rgba(81, 81, 81, 0.03) 0%, rgba(81, 81, 81, 0.03) 12.5%,rgba(158, 158, 158, 0.03) 12.5%, rgba(158, 158, 158, 0.03) 25%,rgba(136, 136, 136, 0.03) 25%, rgba(136, 136, 136, 0.03) 37.5%,rgba(209, 209, 209, 0.03) 37.5%, rgba(209, 209, 209, 0.03) 50%,rgba(152, 152, 152, 0.03) 50%, rgba(152, 152, 152, 0.03) 62.5%,rgba(97, 97, 97, 0.03) 62.5%, rgba(97, 97, 97, 0.03) 75%,rgba(167, 167, 167, 0.03) 75%, rgba(167, 167, 167, 0.03) 87.5%,rgba(22, 22, 22, 0.03) 87.5%, rgba(22, 22, 22, 0.03) 100%),linear-gradient(90deg, hsl(137,0%,23%),hsl(137,0%,23%));

  @media ${devices.mobileL} {
    width: 100%;
    grid-template-columns: 85% 15%;
  }
`;

const MessageBtnStyle = styled.span`
  height: 50px;
  width: 90%;
  margin: auto;
  padding: 2px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px -2px 4px rgba(0, 0, 0, 0.3);
`;

const MessageForm = ({ chatId }) => {
  const { socket, useTransition, useAuth } = useAppHooks();
  const [{user}, dispatchAuth] = useAuth
  const [{ chatSelected }, _] = useTransition;

  const [text, setText] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("new-message", { chatId, authorId: user.id, text });
    socket.emit("stop-typing");
    setText(null);
  };

  const handleKeyPress = e => {
    let timeout = null;

    if (e.key !== "") {
      socket.emit("typing", {id: user.id});
      if (timeout) clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      socket.emit("stop-typing");
    }, 1500);
  };

  const handleFocus = () => {
    socketEmit('message-read', socket, {userId: user.id, chatId})
  }

  return (
    <MessageFormStyle isSelected={chatSelected} onSubmit={handleSubmit}>
      <TextInput
        value={text}
        handleChange={setText}
        handleKeyPress={handleKeyPress}
        handleFocus={handleFocus}
        placeholder="Type your message..."
      />
      <MessageBtnStyle as="button" type="submit" disabled={!text}>
        Send
      </MessageBtnStyle>
    </MessageFormStyle>
  );
};

export default MessageForm;
