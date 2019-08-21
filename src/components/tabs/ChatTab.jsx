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

  socketOn('count-unread-chat', socket, user, (data, user) => {
    console.log('outside')
    if (data && data.chat.users.find(u => u.id === user.id)) {
      console.log('inside')
      setUnread(prevUnread => prevUnread + 1)
    }
    else {
      setUnread(prevUnread => prevUnread === 1 ? 0 : prevUnread - 1)
    }
  })

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.user.getChatList(user.id)
        if (res.data.chats.length > 0) {
          let chatsUnread = res.data.chats.filter(chat => chat.unreads.length > 0)
          setUnread(chatsUnread.length)
        }
      } catch (error) {
        console.log(error)
        alert(error.response.data.msg)
      }
    }

    fetchChat()
  }, [])

  return (
    <ChatsTabStyle>
      <span className='label'>Chats</span>
      {nbUnread > 0 && <span className='number'>{nbUnread}</span>}
    </ChatsTabStyle>
  );
};

export default ChatsTab;
