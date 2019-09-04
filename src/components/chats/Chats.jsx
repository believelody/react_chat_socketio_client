import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useAppHooks } from "../../contexts";
import api from "../../api";
import ChatItem from "./ChatItem";
import { socketOn } from "../../socket";

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

const usePrevious = value => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const Chats = () => {
  const { useAuth, socket } = useAppHooks()
  const [{user}, _] = useAuth

  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [msgMax, setMax] = useState([])

  const previousChats = null

  const refreshChats = (data, chats) => {
    // console.log('chats in socket: ', chats)
    if (!chats.find(chat => chat.id === data.chat.id)) {
      if (chats.length > 0) {
        let tab = chats
        tab.filter(item => item.id !== data.chat.id)
        tab.push(data.chat)
        setChats(tab)
      }
      // else setChats([data.chat])
    }
  }

  socketOn('new-chat', socket, chats, (data, chats) => refreshChats(data, chats))
  socketOn('count-unread-message', socket, chats, (data, chats) => refreshChats(data, chats))
  
  useEffect(() => {
    const getChats = async () => {
      try {
        if (user) {
          let res = await api.user.getChatList(user.id)
          if (res.data.chats.length > 0) {
            setMax(res.data.chats.map(c => new Date(c.messages.reverse()[0].createdAt).getTime()))
            setChats(res.data.chats)
          }
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    
    if (user) {
      getChats()
    }
  }, [user])

  return (
    <ChatsContainer>
      <ChatListStyle>
        {
          !loading && chats.length === 0 && <h4>You have no chats. Choose a Chat and start talking.</h4>
        }
        {
          !loading && chats.length > 0 &&
          chats
            .sort((a, b) => new Date(a.messages.reverse()[0].createdAt).getTime() < new Date(b.messages.reverse()[0].createdAt).getTime())
            .map(chat => <ChatItem key={chat.id} chat={chat} />)
        }
      </ChatListStyle>
    </ChatsContainer>
  );
};

export default Chats;
