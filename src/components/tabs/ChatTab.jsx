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

  const [unreads, setUnreads] = useState(0)

  socketOn('count-unread-chat', socket, user, (data, user) => {
    console.log('outside')
    if (data.users.find(u => u.id === user.id)) {
      console.log('inside')
      setUnreads(prevUnreads => prevUnreads + 1)
    }
  })

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        
      } catch (error) {
        
      }
    }

  }, [])

  return (
    <ChatsTabStyle>
      <span className='label'>Chats</span>
      {unreads > 0 && <span className='number'>{unreads}</span>}
    </ChatsTabStyle>
  );
};

export default ChatsTab;
