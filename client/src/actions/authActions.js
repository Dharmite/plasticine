import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import axios from "axios";

// Register

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/admin/register", userData)
    .then(res => history.push("login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save to location storage
      const { token } = res.data;

      // set token to local storage
      localStorage.setItem("jwtToken", token);

      // set to Auth header
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decoded));

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// set the current user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


// logout user

export const logoutUser = (history) => dispatch => {

  // remove token from localStorage
  localStorage.removeItem('jwtToken');

  // remove auth header for future requests
  setAuthToken(false);

  // set current user to {} which will also set is authenticated to false

  dispatch(setCurrentUser({}));

  history.push('/login');

   
}