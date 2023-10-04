import { RESET_USER, SET_USER, LOADING_USER } from "./constant";

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case RESET_USER:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
