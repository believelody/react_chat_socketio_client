import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAppHooks } from '../../contexts';
import api from '../../api';
import { socketEmit, socketOn } from '../../socket';

const NotFriendStyle = styled.div`
    text-align: center;
    background-color: ${props => props.isDisplayed ? 'white' : 'transparent'};
    color: black;
    position: absolute;
    padding: 5px 0px;
    width: 100%;
    height: auto;
    bottom: 80px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);

    & .blocked-request {
        margin-left: 10px;
        text-transform: uppercase;
        // border-radius: 4px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .4);
    }

    & .or {
        margin: 0px 4px 0px 8px;
    }
`

const NotFriend = ({ contact }) => {
    const { useAuth, socket } = useAppHooks()
    const [{user}, _] = useAuth

    const [isFriend, setIsFriend] = useState(false)
    const [isRequest, setIsRequest] = useState(false)
    const [hasBlocked, setHasBlock] = useState(false)
    const [isBlocked, setIsBlock] = useState(false)

    const checkResponse = (data, user, cb) => {
        if (!data) {
            cb(false)
        }
        else if (data.id === user.id) {
            cb(true)
        }
    }

    const unblockContact = () => {
        alert('contact blocked')
        // socketEmit('check-is-blocked', socket, {contactId: contact.id, userId: user.id})
        // socketEmit('check-has-blocked', socket, {contactId: contact.id, userId: user.id})
    }

    const blockContact = () => {
        alert('contact blocked')
        // socketEmit('check-is-blocked', socket, {contactId: contact.id, userId: user.id})
        // socketEmit('check-has-blocked', socket, {contactId: contact.id, userId: user.id})
    }
    
    const acceptContact = () => {
        socketEmit('new-friend', socket, { contactId: contact.id, userId: user.id })
        socketOn('new-friend-confirm', socket, user, (data, user) => {
            if (data.from.id === user.id) setIsFriend(true)
            if (data.from.id === user.id) setIsRequest(false)
        })
        socketEmit('check-friend', socket, {contactId: contact.id, userId: user.id})
        // socketEmit('check-request', socket, {contactId: contact.id, userId: user.id})
    }

    socketOn('check-friend-response', socket, contact, (data, contact) => checkResponse(data, contact, setIsFriend))
    socketOn('check-request-response', socket, contact, (data, contact) => checkResponse(data, contact, setIsRequest))
    socketOn('delete-friend-confirm', socket, user, (data, user) => {
        if (data.from.id === user.id) setIsFriend(false)
    })
    // socketOn('check-is-blocked-response', socket, user, (data, user) => checkResponse(data, user, setIsBlock))
    // socketOn('check-has-blocked-response', socket, contact, (data, contact) => checkResponse(data, contact, setHasBlock))

    useEffect(() => {
        socketEmit('check-friend', socket, {contactId: contact.id, userId: user.id})
        socketEmit('check-request', socket, {contactId: contact.id, userId: user.id})
        // socketEmit('check-is-blocked', socket, {contactId: contact.id, userId: user.id})
        // socketEmit('check-has-blocked', socket, {contactId: contact.id, userId: user.id})
    }, [])

    return (
        <NotFriendStyle isDisplayed={!isFriend || isRequest || isBlocked || hasBlocked}>
            {
                !isFriend && !isRequest && !hasBlocked && !isBlocked &&
                <span className='not-friend'>
                    This contact is not among your friends. Do you want to block him?
                    <Button className='blocked-request' onClick={blockContact} content={<b>Yes</b>} />
                </span>
            }
            {
                !isFriend && isRequest && !hasBlocked && !isBlocked &&
                <span className='not-friend'>
                    This contact sent you a friend's request. What do you want to do?
                    <Button className='blocked-request' onClick={acceptContact} content={<b>Accept</b>} />
                    <span className='or'>Or</span>
                    <Button className='blocked-request' onClick={blockContact} content={<b>Block</b>} />
                </span>
            }
            {
                !isFriend && !isRequest && hasBlocked && isBlocked && hasBlocked.id === contact.id &&
                <span className='not-friend'>
                    This contact has been blocked. You Do you want to unblock him?
                    <Button className='blocked-request' onClick={unblockContact} content={<b>Yes</b>} />
                </span>
            }
            {
                !isFriend && !isRequest && hasBlocked && isBlocked && isBlocked.id === user.id &&
                <span className='not-friend'>
                    You can no longer send message in this chat!
                </span>
            }
        </NotFriendStyle>
    )
}

export default NotFriend
