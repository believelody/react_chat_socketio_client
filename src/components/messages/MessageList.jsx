import React from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import { useAppHooks } from "../../contexts";

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

const MessageList = ({ users, messages }) => {
  const { useAuth } = useAppHooks()
  const [{user},_] = useAuth
  const messagesRef = React.useRef();

  const contact = users.find(u => u.name !== u.name);

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
