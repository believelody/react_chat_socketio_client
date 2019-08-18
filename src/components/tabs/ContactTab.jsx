import React from "react";
import styled from 'styled-components'
import { useAppHooks } from "../../contexts";
import api from "../../api";

const ContactsTabStyle = styled.div`
  & .friend {
    background-image: -webkit-radial-gradient(circle at 5px 5px, #5cabff, #000);
    background-image: radial-gradient(circle at 5px 5px, #5cabff, #000);
    background-color: #c21500;  /* fallback for old browsers */
    color: white;
  }

  & .request {
    background-image: -webkit-radial-gradient(circle at 2px 2px, #EDDE5D, #F09819);  /* Chrome 10-25, Safari 5.1-6 */
    background-image: radial-gradient(circle at 2px 2px, #EDDE5D, #F09819); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: black;
  }

  & .number {
    margin-left: 8px;
    padding: 4px 10px;
    font-size
    font-weight: bold;
    border-radius: 50%;
    box-shadow: 2px 2px 4px rgba(0,0,0, .3);
  }
`

const ContactsTab = () => {
  const { useAuth, socket } = useAppHooks()
  const [{user}, dispatchAuth] = useAuth

  const [friends, setFriends] = React.useState([])
  const [requests, setRequests] = React.useState([])

  socket.on('new-request-confirm', data => {
    if (data.error) {
      alert(data.error)
    }
    else if (data.to.id === user.id) setRequests(data.requests)
  })

  socket.on('cancel-request-confirm', data => {
    if (data.error) {
      alert(data.error)
    }
    else if (data.to.id === user.id) setRequests(data.requests)
  })

  socket.on('delete-request-confirm', data => {
    if (data.error) {
      alert(data.error)
    }
    else if (data.from.id === user.id) setRequests(data.requests)
  })

  socket.on('new-friend-confirm', data => {
    console.log(data)
    if (data.from.id === user.id) setFriends(data.from.friends)
    if (data.to.id === user.id) setFriends(data.to.friends)
    if (data.from.id === user.id) setRequests(data.from.requests)
  })

  socket.on('delete-friend-confirm', data => {
    console.log(data)
    console.log(user.id)
    if (data.from.id === user.id) setFriends(data.from.friends)
    if (data.to.id === user.id) setFriends(data.to.friends)
  })

  React.useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await api.user.getFriendList(user.id)
        setFriends(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRequests = async () => {
      try {
        const res = await api.user.getRequestList(user.id)
        setRequests(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchFriends()
    fetchRequests()
  }, [])
  
  return (
    <ContactsTabStyle>
      <span className='label'>Contacts</span>
      {friends.length > 0 && <span className='number friend'>{friends.length}</span>}
      {requests.length > 0 && <span className='number request'>{requests.length}</span>}
    </ContactsTabStyle>
  );
};

export default ContactsTab;
