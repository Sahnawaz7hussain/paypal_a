import * as types from "./orderActionType";
const initialOrderData = {
  isLoading: false,
  isError: false,
  order: [],
};

export const orderReducer = (oldState = initialOrderData, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ORDER_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        order: [],
      };
    case types.GET_ORDER_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        order: payload,
      };
    case types.GET_ORDER_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        order: [],
      };
    default:
      return oldState;
  }
};
