import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { useAppHooks } from "../../contexts";
import api from "../../api";
import { socketOn } from "../../socket";

const ChatsTabStyle = styled.div`  
  & .number {
    margin-left: 8px;
    padding: 2px 8px;
    font-weight: bold;
    border-radius: 50%;
    // background: radial-gradient(circle at 2px 2px, #5cabff, #000);
    background: #c21500;  /* fallback for old browsers */
background: -webkit-radial-gradient(circle at 2px 2px, #EDDE5D, #F09819);  /* Chrome 10-25, Safari 5.1-6 */
background: radial-gradient(circle at 2px 2px, #EDDE5D, #F09819); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: black;
    box-shadow: 2px 2px 4px rgba(0,0,0, .3);
  }
`

const ChatsTab = () => {
  const { useAuth, socket } = useAppHooks()
  const [{user}, dispatchAuth] = useAuth

  const [nbUnread, setUnread] = useState(0)
  const [chatUnreads, setChatUnread] = useState([])

  socketOn('count-unread-chat', socket, user, (data, user) => {
    if (user && data && data.receivers.find(u => u.id === user.id)) {
      if (chatUnreads.length === 0) {
        setChatUnread([data.chatId])
        setUnread(1)
      }
      else if (!chatUnreads.find(chatId => chatId === data.chatId)) {
        setChatUnread([...chatUnreads, data.chatId])
        setUnread(nbUnread + 1)
      }
    }
  })

  socketOn('count-read-chat', socket, user, (data, user) => {
    if (user && data && chatUnreads.find(chatId => chatId === data.chat.id) && data.chat.users.find(u => u.id === user.id) && data.userId === user.id) {
      setChatUnread(chatUnreads.filter(chatId => chatId !== data.chat.id))
      setUnread(nbUnread === 1 ? 0 : nbUnread - 1)
    }
  })

  /* socketOn('new-chat', socket, user, (data, user) => {
    if (data.users.find(u => u.id === user.id)) {
      setUnread(nbUnread + 1)
    }
  }) */

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.user.getChatList(user.id)
        if (res.data.chats.length > 0) {
          let unreadChats = res.data.chats.filter(c => c.unreads.length > 0 && c.unreads.find(u => u.authorId !== user.id))
          if (unreadChats.length > 0 && unreadChats.find(chat => chat.unreads.find(unread => unread.authorId !== user.id))){
            setChatUnread(unreadChats.map(chat => chat.id))
            setUnread(unreadChats.length)
          }
        }
      } catch (error) {
        console.log(error)
        // alert(error.response.data.msg)
      }
    }

    if (user) fetchChat()
  }, [user])

  return (
    <ChatsTabStyle>
      <span className='label'>Chats</span>
      {nbUnread > 0 && <span className='number'>{nbUnread}</span>}
    </ChatsTabStyle>
  );
};

export default ChatsTab;
