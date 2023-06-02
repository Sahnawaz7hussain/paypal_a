import { headerObject } from "../../utils/headers";
import * as types from "./orderActionType";
import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getOrderActionFn = () => (dispatch) => {
  dispatch({ type: types.GET_ORDER_REQUEST });
  return axios
    .get(`${base_url}/order/get`, { headers: headerObject() })
    .then((res) => {
      return dispatch({
        type: types.GET_ORDER_SUCCESS,
        payload: res.data.order,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.GET_ORDER_FAILURE,
        payload: err.response.data.message,
      });
    });
};
const getAdminOrderActionFn = () => (dispatch) => {
  dispatch({ type: types.GET_ORDER_REQUEST });
  return axios
    .get(`${base_url}/order/admin/get`, { headers: headerObject() })
    .then((res) => {
      return dispatch({
        type: types.GET_ORDER_SUCCESS,
        payload: res.data.order,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.GET_ORDER_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const postOrderActionFn = (data) => (dispatch) => {
  dispatch({ type: types.POST_ORDER_REQUEST });
  return axios
    .post(`${base_url}/order/add`, data, { headers: headerObject() })
    .then((res) => {
      return dispatch({
        type: types.POST_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.POST_ORDER_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const updateOrderActionFn = (orderId, updateOrderData) => (dispatch) => {
  dispatch({ type: types.PATCH_ORDER_REQUEST });
  return axios
    .patch(`${base_url}/order/update/${orderId}`, updateOrderData, {
      headers: headerObject(),
    })
    .then((res) => {
      return dispatch({
        type: types.PATCH_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.PATCH_ORDER_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export {
  getOrderActionFn,
  postOrderActionFn,
  updateOrderActionFn,
  getAdminOrderActionFn,
};
