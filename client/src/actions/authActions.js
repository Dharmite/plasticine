import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import axios from "axios";
import { decode } from "punycode";

// Register

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
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

      // set current user´
      // console.log(decoded, "decoded")

      if (decoded.userType == "therapist") {
        axios
          .get(`/api/users/therapist/${decoded.id}`)
          .then(res => {
            console.log(res.data.specialty, "data");
            dispatch(setCurrentUser(res.data));
          })
          .catch(err => console.log(err));
      } if(decoded.userType == "parent") {
        axios
        .get(`/api/users/parent/${decoded.id}`)
        .then(res => {
          dispatch(setCurrentUser(res.data));
        })
        .catch(err => console.log(err));
      }


      if(decoded.userType == "admin") {
        axios
        .get(`/api/admin/${decoded.id}`)
        .then(res => {
          dispatch(setCurrentUser(res.data));
        })
        .catch(err => console.log(err));
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// set the current user

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// logout user

export const logoutUser = history => dispatch => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");

  // remove auth header for future requests
  setAuthToken(false);

  // set current user to {} which will also set is authenticated to false

  dispatch(setCurrentUser({}));

  history.push("/login");
};
