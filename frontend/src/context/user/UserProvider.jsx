import React, { createContext, useReducer } from "react";
import { userReducer } from "./reducer";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const initialState = {
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
