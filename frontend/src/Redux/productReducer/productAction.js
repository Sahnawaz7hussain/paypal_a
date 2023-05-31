import * as types from "./productActionType";
import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getProductActionFn = (payload) => (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_REQUEST });
  return axios
    .get(`${base_url}/product/list`, {
      params: { ...payload },
    })
    .then((res) => {
      return dispatch({
        type: types.GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.GET_PRODUCTS_FAILURE,
        payload: err.response.data.message,
      });
    });
};
const postProductActionFn = (data) => (dispatch) => {
  dispatch({ type: types.POST_PRODUCTS_REQUEST });
  return axios
    .post(`${base_url}/product/add`, data)
    .then((res) => {
      return dispatch({
        type: types.POST_PRODUCTS_SUCCESS,
        payload: res.data.product,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.POST_PRODUCTS_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const updateProductActionFn = (productId, updateData) => (dispatch) => {
  dispatch({ type: types.PATCH_PRODUCTS_REQUEST });
  return axios
    .patch(`${base_url}/product/update${productId}`, updateData)
    .then((res) => {
      return dispatch({
        type: types.PATCH_PRODUCTS_SUCCESS,
        payload: res.data.product,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.PATCH_PRODUCTS_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const deleteProductActionFn = (productId) => (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCTS_REQUEST });
  return axios
    .delete(`${base_url}/product/delete/${productId}`)
    .then((res) => {
      return dispatch({
        type: types.DELETE_PRODUCTS_SUCCESS,
        payload: res.data.product,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.DELETE_PRODUCTS_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export {
  getProductActionFn,
  postProductActionFn,
  updateProductActionFn,
  deleteProductActionFn,
};
