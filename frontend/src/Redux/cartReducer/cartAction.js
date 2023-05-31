import { headerObject } from "../../utils/headers";
import * as types from "./cartActionType";
import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getCartActionFn = () => (dispatch) => {
  dispatch({ type: types.GET_CART_REQUEST });
  return axios
    .get(`${base_url}/cart/get`, { headers: headerObject() })
    .then((res) => {
      return dispatch({ type: types.GET_CART_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({
        type: types.GET_CART_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const postCartActionFn = (data) => (dispatch) => {
  dispatch({ type: types.POST_CART_REQUEST });
  return axios
    .post(`${base_url}/cart/add`, data, { headers: headerObject() })
    .then((res) => {
      return dispatch({
        type: types.POST_CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.POST_CART_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const updateCartActionFn = (cartId, updateCartData) => (dispatch) => {
  dispatch({ type: types.PATCH_CART_REQUEST });
  return axios
    .patch(`${base_url}/cart/update/${cartId}`, updateCartData, {
      headers: headerObject(),
    })
    .then((res) => {
      return dispatch({
        type: types.PATCH_CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.PATCH_CART_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const deleteCartActionFn = (cartId) => (dispatch) => {
  dispatch({ type: types.DELETE_CART_REQUEST });
  return axios
    .delete(`${base_url}/cart/delete/${cartId}`, { headers: headerObject() })
    .then((res) => {
      return dispatch({
        type: types.DELETE_CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.DELETE_CART_FAILURE,
        payload: err.response.data.message,
      });
    });
};
export {
  getCartActionFn,
  postCartActionFn,
  updateCartActionFn,
  deleteCartActionFn,
};
