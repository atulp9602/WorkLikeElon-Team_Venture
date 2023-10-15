import { toast } from "react-hot-toast";

import { LOADING_USER, RESET_USER, SET_USER } from "./constant";
import { fetchLoggedUserDetail } from "../../services/user";

//action
export const setUserProfile = async (dispatch) => {
  try {
    dispatch({
      type: LOADING_USER,
    });
    const response = await fetchLoggedUserDetail("users/loggedUserDetail");
    dispatch({
      type: SET_USER,
      payload: response?.data?.data || {},
    });
  } catch (error) {
    toast.error(error, { id: error });
  } finally {
  }
};

export const resetUser = (dispatch) => {
  dispatch({
    type: RESET_USER,
  });
};
