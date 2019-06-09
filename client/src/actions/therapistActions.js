import {
  GET_THERAPIST,
  GET_THERAPISTS,
  ADD_THERAPIST,
  UPDATE_THERAPIST,
  THERAPISTS_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

import axios from "axios";

export const setTherapistsLoading = () => {
  return {
    type: THERAPISTS_LOADING
  };
};

export const getTherapist = id => async dispatch => {
  const res = await axios.get(`/api/users/therapist/${id}`);
  dispatch({
    type: GET_THERAPIST,
    payload: res.data
  });
};

export const getTherapists = () => async dispatch => {
  dispatch(setTherapistsLoading());

  const res = await axios.get("/api/users/therapists");

  dispatch({
    type: GET_THERAPISTS,
    payload: res.data
  });
};

export const addTherapist = (newTherapist, history) => async dispatch => {
  try {
    const res = await axios.post("/api/admin/therapist", newTherapist);

    dispatch({
      type: ADD_THERAPIST,
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

export const updateTherapist = (therapist, history) => async dispatch => {

  try {
    const res = await axios.post(
      `/api/users/therapist/${therapist.id}`,
      therapist
    );

    dispatch({
      type: UPDATE_THERAPIST,
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};