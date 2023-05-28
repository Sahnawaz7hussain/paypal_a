// import libraries
import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";

// reducers
import { authReducer } from "./authReducer/authReducer";
import { productReducer } from "./productReducer/productReducer";
import { cartReducer } from "./cartReducer/cartReducer";

// rootRedicer
const rootReducer = combineReducers({
  authReducer,
  productReducer,
  cartReducer,
});

// set up redux devtool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
