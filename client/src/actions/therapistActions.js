import { GET_THERAPISTS, ADD_THERAPIST, GET_ERRORS } from "./types";

import axios from "axios";

export const getTherapists = () => async dispatch => {
  const res = await axios.get("/api/users/therapists");

  dispatch({
    type: GET_THERAPISTS,
    payload: res.data
  });
};

export const addTherapist = newTherapist => async dispatch => {
  const res = await await axios.post("/api/admin/therapist", newTherapist);

  dispatch({
    type: ADD_THERAPIST,
    payload: res.data
  });
};
