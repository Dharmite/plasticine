import {
  GET_PARENTS,
  ADD_PARENT,
  GET_PARENT,
  UPDATE_PARENT
} from "./types";

import axios from "axios";

export const getParents = () => async dispatch => {
  const res = await axios.get("/api/users/parents");

  dispatch({
    type: GET_PARENTS,
    payload: res.data
  });
};

export const addParent = newParent => async dispatch => {
  const res = await await axios.post("/api/admin/parent", newParent);

  dispatch({
    type: ADD_PARENT,
    payload: res.data
  });
};

export const getParent = id => async dispatch => {
  const res = await axios.get(`/api/users/parent/${id}`);
  dispatch({
    type: GET_PARENT,
    payload: res.data
  });
};

export const updateParent = parent => async dispatch => {
  const res = await axios.post(
    `/api/users/parent/${parent.id}`,
    parent
  );
  dispatch({
    type: UPDATE_PARENT,
    payload: res.data
  });
};
