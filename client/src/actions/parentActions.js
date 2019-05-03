import { GET_PARENTS, ADD_PARENT } from "./types";

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
