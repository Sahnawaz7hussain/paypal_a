import { headerObject } from "../../utils/headers";
import * as types from "./addressActionType";
import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getAddressActionFn = () => (dispatch) => {
  dispatch({ type: types.GET_ADDRESS_REQUEST });
  return axios
    .get(`${base_url}/address/get`, { headers: headerObject() })
    .then((res) => {
      return dispatch({
        type: types.GET_ADDRESS_SUCCESS,
        payload: res.data.address,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.GET_ADDRESS_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const postAddressActionFn = (data) => (dispatch) => {
  dispatch({ type: types.POST_ADDRESS_REQUEST });
  return axios
    .post(`${base_url}/address/add`, data, { headers: headerObject() })
    .then((res) => {
      return dispatch({
        type: types.POST_ADDRESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.POST_ADDRESS_FAILURE,
        payload: err.response.data.message,
      });
    });
};

const updateAddressActionFn = (addressId, updateAddressData) => (dispatch) => {
  dispatch({ type: types.PATCH_ADDRESS_REQUEST });
  return axios
    .patch(`${base_url}/address/update/${addressId}`, updateAddressData, {
      headers: headerObject(),
    })
    .then((res) => {
      return dispatch({
        type: types.PATCH_ADDRESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: types.PATCH_ADDRESS_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export { getAddressActionFn, postAddressActionFn, updateAddressActionFn };
