import * as types from "./authActionType";
const isUser = JSON.parse(localStorage.getItem("user")) || null;
const isAuth = isUser ? true : false;
//console.log("userTokan");
const initAuthData = {
  isAuth: isAuth,
  isLoading: false,
  isError: false,
  error: {},
};
const authReducer = (oldState = initAuthData, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.USER_SIGNUP_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        error: {},
        isAuth: false,
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        error: {},
        isAuth: false,
      };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        error: payload,
        isAuth: false,
      };
    case types.USER_LOGIN_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
        error: {},
        isAuth: false,
      };
    case types.USER_LOGIN_SUCCESS:
      window.localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        isAuth: true,
        error: {},
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
        error: payload,
        isAuth: false,
      };
    case types.USER_LOGOUT_REQUEST:
      localStorage.removeItem("user");
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        isAuth: false,
      };
    default:
      return oldState;
  }
};
export { authReducer };
