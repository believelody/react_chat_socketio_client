import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import styled from "styled-components";
import devices from "../../utils/devices";
import { useAppHooks } from "../../contexts";
import { SET_CURRENT_PROFILE, DISCONNECT } from "../../reducers/authReducer";
import setAuth from "../../utils/setAuth";
import Sidenav from "../sidenav/Sidenav";

const secret = process.env.REACT_APP_SECRET || process.env.REACT_APP_SECRET_DEV;

const PageStyle = styled.div`
  width: 100%;
  max-height: 100vh;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 30% 70%;
  z-index: 0;
  position: relative;

  @media ${devices.tablet} {
    grid-template-columns: 40% 60%;
  }

  @media ${devices.tablet} {
    grid-template-columns: 35% 65%;
  }

  @media ${devices.mobileL} {
    width: 200vw;
    position: absolute;
    display: grid;
    grid-template-columns: 50% 50%;
    left: 0;
    transform: translateX(${props => (props.isSelected ? -100 : 0)}vw);
    transition: all 600ms ease-in;
  }
`;

const AuthRoute = ({ component: Component, ...rest }) => {
  const { useAuth, useTransition, socket } = useAppHooks();
  const [{ isConnected, user }, dispatch] = useAuth;
  const [{ chatSelected }, _] = useTransition;

  const [isLoaded, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.chat_token && !isConnected) {
      setAuth(localStorage.chat_token);
      const decoded = jwt.verify(localStorage.chat_token, secret);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch({ type: DISCONNECT });
      } else {
        dispatch({ type: SET_CURRENT_PROFILE, payload: decoded });
      }
    }
    setLoading(false);
  }, [dispatch, isConnected]);

  React.useEffect(() => {
    if (isConnected) {
      socket.emit("user-emit", { userId: user.id, socketId: socket.id });
    }
    setLoading(false);
  }, [isConnected, socket, user]);

  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          {isLoaded && <div>Loading...</div>}
          {
            !isLoaded && isConnected &&
            <PageStyle isSelected={chatSelected}>
              <Sidenav />
              <Component {...props} />
            </PageStyle>
            }
          {!isLoaded && !isConnected && <Redirect to="/login" />}
        </React.Fragment>
      )}
    />
  );
};

export default AuthRoute;
