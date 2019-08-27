import React, { useEffect, useState } from "react";
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

const Chats = () => {
  const { useAuth, socket } = useAppHooks()
  const [{user}, _] = useAuth

  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  socketOn('new-chat', socket, user, (data, user) => {
    if (!chats.find(chat => chat.id === data.chat.id)) {
      setChats([...chats, data.chat])
    }
  })

  useEffect(() => {
    const getChats = async () => {
      try {
        if (user) {
          let res = await api.user.getChatList(user.id)
          if (res.data.chats.length > 0) setChats(res.data.chats)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    if (user) getChats()
  }, [user])

  // console.log(chats)

  return (
    <ChatsContainer>
      <ChatListStyle>
        {
          !loading && chats.length === 0 && <h4>You have no chats. Choose a Chat and start talking.</h4>
        }
        {
          !loading && chats.length > 0 &&
          chats
            .sort((a, b) => {
              const sec = date => new Date(date).getSeconds()
              const min = date => new Date(date).getMinutes()
              const hour = date => new Date(date).getHours()
              const day = date => new Date(date).getDate()
              const month = date => new Date(date).getMonth()
              const year = date => new Date(date).getFullYear()
              /* console.log(a.messages.reverse()[0])
              return day(a.messages[0].createdAt) - day(b.messages[0].createdAt) || month(a.messages[0].createdAt) - month(b.messages[0].createdAt) || year(a.messages[0].createdAt) - year(b.messages[0].createdAt) */
              if (sec(a.messages.reverse()[0].createdAt) === sec(b.messages.reverse()[0].createdAt)) {
                if (min(a.messages.reverse()[0].createdAt) === min(b.messages.reverse()[0].createdAt)) {
                  if (hour(a.messages.reverse()[0].createdAt) === hour(b.messages.reverse()[0].createdAt)) {
                    if (day(a.messages.reverse()[0].createdAt) === day(b.messages.reverse()[0].createdAt)) {
                      if (month(a.messages.reverse()[0].createdAt) === month(b.messages.reverse()[0].createdAt)) {
                        return year(a.messages.reverse()[0].createdAt) - year(b.messages.reverse()[0].createdAt)
                      }
                      else {
                        return month(a.messages.reverse()[0].createdAt) - month(b.messages.reverse()[0].createdAt)
                      }
                    }
                    else {
                      return day(a.messages.reverse()[0].createdAt) - day(b.messages.reverse()[0].createdAt)
                    }
                  }
                  else {
                    return hour(a.messages.reverse()[0].createdAt) - hour(b.messages.reverse()[0].createdAt)
                  }
                }
                else {
                  return min(a.messages.reverse()[0].createdAt) - min(b.messages.reverse()[0].createdAt)
                }
              }
              else {
                return sec(a.messages.reverse()[0].createdAt) - sec(b.messages.reverse()[0].createdAt)
              }
            })
            .map(chat => <ChatItem key={chat.id} chat={chat} />)
        }
      </ChatListStyle>
    </ChatsContainer>
  );
};

export default Chats;
