import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "../actions/types";

// REGISTER USER
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// LOGIN - GET USER TOKEN
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // SAVE TO LOCAL STORAGE
      const { token } = res.data;
      // SET TOKEN TO LOCALSTORAGE
      localStorage.setItem("jwtToken", token);
      // SET TOKEN TO AUTH HEADER
      setAuthToken(token);
      // DECODE TOKEN TO GET USER DATA
      const decoded = jwt_decode(token);
      // SET CURRENT USER
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove the auth header for future requests
  setAuthToken(false);
  // Set the current user to {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
