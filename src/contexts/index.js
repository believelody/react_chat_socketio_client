import React, { createContext, useContext, useReducer } from "react";
import io from "socket.io-client";
import { createBrowserHistory } from "history";
// import reducers from "../reducers";
import { authReducer, initAuthState } from "../reducers/authReducer";
import {
  transitionReducer,
  initTransitionState
} from "../reducers/transitionReducer";

export const AppContext = createContext();

const history = createBrowserHistory({
  forceRefresh: true
});
let herokuUrl = process.env.BASE_URL || 'http://localhost:5000';
const socket = io(`${herokuUrl}`);

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        useAuth: useReducer(authReducer, initAuthState),
        useTransition: useReducer(transitionReducer, initTransitionState),
        socket,
        history
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppHooks = () => useContext(AppContext);
