import * as types from "./productActionType";
const intialData = {
  isLoading: false,
  isError: false,
  err: "",
  products: [],
};

export const productReducer = (oldState = intialData, action) => {
  const { payload, type } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        products: [],
        err: "",
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        products: payload,
        err: "",
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        products: [],
        err: payload,
      };
    case types.POST_PRODUCTS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        products: [],
        err: "",
      };
    case types.POST_PRODUCTS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        products: payload,
        err: "",
      };
    case types.POST_PRODUCTS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        products: [],
        err: payload,
      };
    case types.PATCH_PRODUCTS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        products: [],
        err: "",
      };
    case types.PATCH_PRODUCTS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        products: payload,
        err: "",
      };
    case types.PATCH_PRODUCTS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        products: [],
        err: payload,
      };
    case types.DELETE_PRODUCTS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        products: [],
        err: "",
      };
    case types.DELETE_PRODUCTS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        products: payload,
        err: "",
      };
    case types.DELETE_PRODUCTS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        products: [],
        err: payload,
      };
    default:
      return oldState;
  }
};
