import React from "react";
import styled from "styled-components";
import Chat from "../../components/chats/Chat";

const ChatDetailStyle = styled.div`
  position: relative;
`

const ChatDetail = ({ match }) => {
  return (
    <ChatDetailStyle>
      <Chat id={match.params.id} />
    </ChatDetailStyle>
  );
};

export default ChatDetail;
