import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useAppHooks } from "../../contexts";
import { SET_CURRENT_PROFILE, DISCONNECT } from "../../reducers/authReducer";
import setAuth from "../../utils/setAuth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { useAuth, socket } = useAppHooks();
  const [{ isConnected, user }, dispatch] = useAuth;

  const [isLoaded, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.token && !isConnected) {
      setAuth(localStorage.token);
      const decoded = jwt.verify(localStorage.token, process.env.REACT_SECRET);
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
          {!isLoaded && isConnected && <Component {...props} />}
          {!isLoaded && !isConnected && <Redirect to="/login" />}
        </React.Fragment>
      )}
    />
  );
};

export default AuthRoute;
