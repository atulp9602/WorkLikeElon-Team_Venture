import { toast } from "react-hot-toast";

import { RESET_GROUPS, SET_GROUPS, LOADING_GROUPS } from "./constant";
import { fetchLoggedUserGroups } from "../../services/group";

//action
export const setGroups = async (dispatch) => {
  dispatch({
    type: LOADING_GROUPS,
  });
  try {
    const response = await fetchLoggedUserGroups("/groups/loggedUserGroupList");
    dispatch({
      type: SET_GROUPS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    toast.error(error, { id: error });
  } finally {
  }
};

export const resetGroups = (dispatch) => {
  dispatch({
    type: RESET_GROUPS,
  });
};
