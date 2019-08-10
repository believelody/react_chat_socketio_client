import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import api from "../../api";

const ChatsContainer = styled.div`
  padding: 0;
  margin: 0;

  & h4 {
    margin-left: 15px;
  }
`;

const ChatListStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  &::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #243140;
  }
`;

const Chats = () => {
  const {useAuth} = useAppHooks()
  const [{user}, _] = useAuth

  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getChats = async () => {
      if (user) {
        let c = await api.user.getChatList(user.id)
        if (c.length > 0) setChats(c)
      }
      setLoading(false)
    }

    getChats()
  }, [user])

  console.log(loading)

  return (
    <ChatsContainer>
      <ChatListStyle>
        {
          !loading && chats.length === 0 && <h4>You have no chats. Choose a Chat and start talking.</h4>
        }
        {
          !loading && chats.length > 0 && console.log(chats)
        }
      </ChatListStyle>
    </ChatsContainer>
  );
};

export default Chats;
