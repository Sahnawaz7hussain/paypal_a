import * as types from "./cartActionType";
const initialCart = {
  isLoading: false,
  isError: false,
  cart: [],
  err: "",
};
export const cartReducer = (oldState = initialCart, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_CART_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        cart: [],
        err: "",
      };
    case types.GET_CART_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        cart: payload,
        err: "",
      };
    case types.GET_CART_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        cart: [],
        err: payload,
      };
    case types.POST_CART_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        cart: [],
        err: "",
      };
    case types.POST_CART_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        cart: payload,
        err: "",
      };
    case types.POST_CART_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        cart: [],
        err: payload,
      };
    case types.PATCH_CART_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        cart: [],
        err: "",
      };
    case types.PATCH_CART_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        cart: payload,
        err: "",
      };
    case types.PATCH_CART_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        cart: [],
        err: payload,
      };
    case types.DELETE_CART_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        cart: [],
        err: "",
      };
    case types.DELETE_CART_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        cart: payload,
        err: "",
      };
    case types.DELETE_CART_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        cart: [],
        err: payload,
      };
    default:
      return oldState;
  }
};
