import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import api from "../../api";

const ChatListStyle = styled.div``;

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

  return (
    <ChatListStyle>
      {
        !loading && chats.length === 0 && <h4>You have no chats. Choose a friend and start talking.</h4>
      }
      {
        !loading && chats.length > 0 && console.log(chats)
      }
    </ChatListStyle>
  );
};

export default Chats;
