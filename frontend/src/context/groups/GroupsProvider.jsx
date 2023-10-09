import React, { createContext, useReducer } from "react";
import { groupsReducer } from "./reducer";

export const GroupsContext = createContext();

const GroupsProvider = ({ children }) => {
  const initialState = {
    groups: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(groupsReducer, initialState);

  return (
    <GroupsContext.Provider value={{ state, dispatch }}>
      {children}
    </GroupsContext.Provider>
  );
};

export default GroupsProvider;
