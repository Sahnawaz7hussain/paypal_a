import * as types from "./authActionType";
import axios from "axios";
const auth_url = import.meta.env.VITE_BASE_URL;

const userSignupActionFn = (creds) => (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_REQUEST });
  return axios
    .post(`${auth_url}/user/signup`, creds)
    .then((res) => {
      return dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({
        type: types.USER_SIGNUP_FAILURE,
        payload: err.response.data.message,
      });
    });
};

// Login
const userLoginActionFn = (creds) => (dispatch) => {
  dispatch({ type: types.USER_LOGIN_REQUEST });
  return axios
    .post(`${auth_url}/user/login`, creds)
    .then((res) => {
      return dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log("erraction: ", err.response.data);
      return dispatch({
        type: types.USER_LOGIN_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const userLogoutActionFn = () => (dispatch) => {
  return dispatch({ type: types.USER_LOGOUT_REQUEST });
};

export { userSignupActionFn, userLoginActionFn, userLogoutActionFn };
