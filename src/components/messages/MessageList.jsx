import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";
import { useAppHooks } from "../../contexts";
import { socketOn } from "../../socket";
import Moment from "react-moment";

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

const MessageDate = styled.div`
  width: 100%;
  height: 50px;
  color: black;
  // background-color: rgba(255, 255, 255, .4);
  text-align: center;
  line-height: 50px;
  font-size: 1.7em;
`

const MessageSortedByDate = ({ messages, contact }) => {
  let dates = []
  const day = date => new Date(date).getDate()
  const month = date => new Date(date).getMonth()
  const year = date => new Date(date).getFullYear()

  for (let i = 0; i < messages.length; i++) {
    if (i > 0) {
      if (day(messages[i].createdAt) !== day(messages[i - 1].createdAt) || month(messages[i].createdAt) !== month(messages[i - 1].createdAt) || year(messages[i].createdAt) !== year(messages[i - 1].createdAt)) {
        dates.push(messages[i].createdAt)
      }
    }
    else {
      dates.push(messages[i].createdAt)
    }
  }
  
  return dates.map(date =>
    <React.Fragment key={date}>
      <MessageDate>
        <Moment format="D MMM YYYY" date={date} />
      </MessageDate>
      {
        messages
          .filter(message => day(date) === day(message.createdAt) && month(date) === month(message.createdAt) && year(date) === year(message.createdAt))
          .map(message => (
            <MessageItem key={message.id} contact={contact} message={message} />
          )
        )
      }
    </React.Fragment>
  )
}

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
        messages.length > 0 && 
        <MessageSortedByDate contact={contact} messages={messages} />
      }
    </MessageListStyle>
  );
};

export default MessageList;
