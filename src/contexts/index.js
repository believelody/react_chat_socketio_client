import React, { createContext, useContext, useReducer } from "react";
import io from "socket.io-client";
import { createBrowserHistory } from "history";
import { authReducer, initAuthState } from "../reducers/authReducer";
import {
  transitionReducer,
  initTransitionState
} from "../reducers/transitionReducer";
import { modalReducer, initModalState } from "../reducers/modalReducer";
import { searchReducer, initSearchState } from "../reducers/searchReducer";
import { hookReducer, initHookState } from "../reducers/hookReducer";

export const AppContext = createContext();

const history = createBrowserHistory({
  forceRefresh: true
});
let herokuUrl = process.env.REACT_APP_SERVER_URL
  ? process.env.REACT_APP_SERVER_URL
  : "http://localhost:5000";
const socket = io(herokuUrl);

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        useAuth: useReducer(authReducer, initAuthState),
        useTransition: useReducer(transitionReducer, initTransitionState),
        useModal: useReducer(modalReducer, initModalState),
        useSearch: useReducer(searchReducer, initSearchState),
        useHook: useReducer(hookReducer, initHookState),
        socket,
        history
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppHooks = () => useContext(AppContext);
