import React, { useState } from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import { useAppHooks } from "../../contexts";
import { socketOn } from "../../socket";

const MessageListStyle = styled.ul`
  margin: 50px 0px 140px;
  padding: 10px 10px 10px;
  display: flex;
  list-style: none;
  flex-direction: column-reverse;
  height: calc(100vh - 130px);
  width: 100%;
  position: relative;
  bottom: 0;
  scroll-behavior: smooth;
`;

const MessageList = ({ chat }) => {
  const { useAuth, socket } = useAppHooks()
  const [{user},_] = useAuth
  const messagesRef = React.useRef();
  
  const [messages, setMessages] = useState(chat.messages)
  const [users, setUsers] = useState(chat.users)
  const contact = users.find(u => u.name !== user.name);

  socketOn('fetch-messages', socket, messages, (data, messages) => {
    if (data.chatId === chat.id && messages.length !== data.messages.length) {
      setMessages(data.messages)
    }
  })

  return (
    <MessageListStyle ref={messagesRef}>
      {messages.length > 0 &&
        messages
          .reverse()
          .map((message, i) => (
            <MessageItem key={i} contact={contact} message={message} />
          ))}
    </MessageListStyle>
  );
};

export default MessageList;
