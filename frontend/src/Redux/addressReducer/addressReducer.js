import * as types from "./addressActionType";

const initAddress = {
  loading: false,
  error: false,
  address: {},
};

export const addressReducer = (oldState = initAddress, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ADDRESS_REQUEST:
      return {
        ...oldState,
        loading: true,
        error: false,
      };
    case types.GET_ADDRESS_SUCCESS:
      return {
        ...oldState,
        loading: false,
        error: false,
        address: payload,
      };
    case types.GET_ADDRESS_FAILURE:
      return {
        ...oldState,
        loading: false,
        error: true,
        address: {},
      };
    default:
      return oldState;
  }
};
