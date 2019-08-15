import React from "react";
import styled from 'styled-components'
import { useAppHooks } from "../../contexts";
import api from "../../api";

const ContactsTabStyle = styled.div`
  & .label {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
  }
  
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

const ContactsTab = () => {
  const { useAuth } = useAppHooks()
  const [{user}, _] = useAuth

  const [requests, setRequests] = React.useState([])

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
          const res = await api.user.getRequestList(user.id)
          if (res.data.length > 0) {
            setRequests(res.data)
          }
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchRequests()
  }, [])

  return (
    <ContactsTabStyle>
      <span className='label'>Contacts</span>
      {requests.length > 0 && <span className='number'>{requests.length}</span>}
    </ContactsTabStyle>
  );
};

export default ContactsTab;
