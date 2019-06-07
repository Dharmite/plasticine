import {
  GET_PARENTS,
  ADD_PARENT,
  GET_PARENT,
  UPDATE_PARENT,
  PARENTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

import axios from "axios";

export const setParentLoading = () => {
  return {
    type: PARENTS_LOADING
  };
};

export const getParents = () => async dispatch => {
  dispatch(setParentLoading());

  const res = await axios.get("/api/users/parents");

  dispatch({
    type: GET_PARENTS,
    payload: res.data
  });
};

export const addParent = (newParent, history) => async dispatch => {
  try {
    const res = await await axios.post("/api/admin/parent", newParent);

    dispatch({
      type: ADD_PARENT,
      payload: res.data
    });

    dispatch(clearErrors());

    history.push("/admin-dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getParent = id => async dispatch => {
  const res = await axios.get(`/api/users/parent/${id}`);
  dispatch({
    type: GET_PARENT,
    payload: res.data
  });
};

export const updateParent = (parent, history) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/parent/${parent.id}`, parent);
    dispatch({
      type: UPDATE_PARENT,
      payload: res.data
    });
    dispatch(clearErrors());

    history.push("/admin-dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
