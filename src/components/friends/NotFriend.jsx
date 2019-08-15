import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { useAppHooks } from '../../contexts';
import api from '../../api';

const NotFriendStyle = styled.div`
    text-align: center;
    background-color: white;
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
`

const NotFriend = ({ contact }) => {
    const { useAuth } = useAppHooks()
    const [{user}, _] = useAuth

    const [isFriend, setIsFriend] = useState(null)
    const [isRequest, setIsRequest] = useState(null)
    const [hasBlocked, setHasBlock] = useState(null)
    const [isBlocked, setIsBlock] = useState(null)

    const blockContact = () => {
        alert('contact blocked')
    }
    
    const acceptContact = () => {
        alert('friend\'s request accepted')
    }

    useEffect(() => {
        const checkFriend = async () => {
            const res = await api.user.getFriendList(user.id)
            const friends = res.data
            if (friends.length > 0) {
                let match = friends.find(friend => friend.id === contact.id)
                if (match) {
                    setIsFriend(match)
                }
                else {
                    setIsFriend(null)
                }
            }
        }

        checkFriend()
    }, [isFriend])

    console.log('not friend')

    return (
        <NotFriendStyle>
            {
                !isFriend && !isRequest && !hasBlocked && !isBlocked &&
                <span className='not-friend'>
                    This contact is not among your friends. Do you want to block him?
                    <Button className='blocked-request' onClick={blockContact} content={<b>Yes</b>} />
                </span>
            }
            {
                !isFriend && isRequest && !hasBlocked && !isBlocked && isRequest.id === contact.id &&
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
                    <Button className='blocked-request' onClick={blockContact} content={<b>Yes</b>} />
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
