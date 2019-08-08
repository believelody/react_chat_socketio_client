import React from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";

const MessageListStyle = styled.ul`
  margin: 50px 0px 140px;
  padding: 10px 10px 10px;
  display: flex;
  list-style: none;
  flex-direction: column;
  height: calc(100% - 130px);
  width: 100%;
  overflow: auto;
  position: relative;
  scroll-behavior: smooth;
`;

const MessageList = ({ users, messages }) => {
  const messagesRef = React.useRef();
  const contact = users.find(user => user.username !== localStorage.username);

  React.useEffect(() => {
    if (messagesRef)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <MessageListStyle ref={messagesRef}>
      {messages.length > 0 &&
        messages.map((message, i) => (
          <MessageItem key={i} contact={contact} message={message} />
        ))}
    </MessageListStyle>
  );
};

export default MessageList;
