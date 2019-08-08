import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import devices from "../../utils/devices";
import TextInput from "../inputs/TextInput";

const MessageFormStyle = styled.form`
  position: absolute;
  padding: 8px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: grid;
  grid-template-columns: 90% 10%;
  background-image: linear-gradient(-45deg, #2c3e50, #373b44);

  @media ${devices.mobileL} {
    width: 100%;
    grid-template-columns: 85% 15%;
  }
`;

const MessageInputStyle = styled.input`
  background-color: white;
  width: auto;
  border-radius: 10px;
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
  const { socket, useTransition } = useAppHooks();

  const [{ chatSelected }, _] = useTransition;

  const [text, setText] = useState("");
  const [isSelected, setSelected] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("new-message", { chatId, author: localStorage.username, text });
    socket.emit("stop-typing");
    setText(null);
  };

  const handleKeyPress = e => {
    let timeout = null;

    if (e.key !== "") {
      socket.emit("typing");
      if (timeout) clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      socket.emit("stop-typing");
    }, 1500);
  };

  return (
    <MessageFormStyle isSelected={chatSelected} onSubmit={handleSubmit}>
      <TextInput
        value={text}
        handleChange={setText}
        placeholder="Type your message..."
      />
      <MessageBtnStyle as="button" type="submit" disabled={!text}>
        Send
      </MessageBtnStyle>
    </MessageFormStyle>
  );
};

export default MessageForm;
