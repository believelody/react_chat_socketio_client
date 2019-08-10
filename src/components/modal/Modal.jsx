import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices';
import { useAppHooks } from '../../contexts';
import { CLOSE_MODAL } from '../../reducers/modalReducer';

const Content = styled.section``

const Dimmer = styled.div`
    top: 0;
    left: 0;
    border: 1px solid black;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
    position: fixed;
    z-index: ${props => props.isOpen ? 99 : -1};
    opacity: ${props => props.isOpen ? 1 : 0};
    transition: all 500ms ease-in-out;

    & ${Content} {
        position: absolute;
        top: ${props => props.isOpen ? 50 : 0}%;
        left: ${props => props.isOpen ? 50 : 0}%;
        transform: translate3d(-50%, -50%, 0);
        transition: all 500ms 200ms ease-in-out;
        width: ${props => props.isOpen ? 60 : 0}%;
        height: ${props => props.isOpen ? 90 : 0}%;
    }

    @media ${devices.mobileL} {
        $ ${Content} {
            width: ${props => props.isOpen ? 90 : 0}%;
        }
    }
`

const Modal = ({ children }) => {
    const { useModal } = useAppHooks()
    const [{isOpen}, dispatch] = useModal

    const handleClick = e => {
        dispatch({ type: CLOSE_MODAL })
    }

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

  return (
    <Dimmer isOpen={isOpen} onClick={handleClick}>
      <Content>{children}</Content>
    </Dimmer>
  )
}

export default Modal
