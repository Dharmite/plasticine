import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { CLEAR_ERRORS } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("login");
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));

      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));

  history.push("/login");
};

export const adminChangePassword = (data, history) => async dispatch => {
  try {
    const res = axios.post("/api/admin/password", data);
    dispatch(clearErrors());
    history.push("/admin-dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const therapistChangePassword = (passwordData, history) => dispatch => {
  axios
    .post("/api/users/therapist/change/password", passwordData)
    .then(res => {
      dispatch(clearErrors());
      history.push("/terapeuta-dashboard");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
export const parentChangePassword = (passwordData, history) => async dispatch => {
  axios
    .post("/api/users/parent/change/password", passwordData)
    .then(res => {
      dispatch(clearErrors());
      history.push("/parente-dashboard");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
