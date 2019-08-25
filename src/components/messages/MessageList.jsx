import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import { useAppHooks } from "../../contexts";
import { socketOn } from "../../socket";

const MessageListStyle = styled.ul`
  margin: 50px 0px 140px;
  padding: 10px 10px 50px;
  display: block;
  list-style: none;
  height: calc(100vh - 130px);
  width: 100%;
  position: relative;
  bottom: 0;
  overflow-y: scroll;
  // scroll-behavior: smooth;
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

  useEffect(() => {
    if (messagesRef) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight)
    }
  }, [messages])

  return (
    <MessageListStyle ref={messagesRef}>
      {
        messages.length > 0 && messages.map((message, i) => (
          <MessageItem key={i} contact={contact} message={message} />
        ))
      }
    </MessageListStyle>
  );
};

export default MessageList;
