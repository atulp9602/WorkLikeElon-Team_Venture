import {
  RESET_GROUPS,
  SET_GROUPS,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  LOADING_GROUPS,
} from "./constant";

export const groupsReducer = (state, action) => {
  switch (action.type) {
    case LOADING_GROUPS:
      return {
        ...state,
        loading: true,
      };
    case SET_GROUPS:
      return {
        ...state,
        loading: false,
        groups: action.payload,
      };
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group?._id === action.payload._id ? action.payload : group
        ),
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group?._id !== action.payload),
      };
    case RESET_GROUPS:
      return {
        ...state,
        groups: [],
      };
    default:
      return state;
  }
};
