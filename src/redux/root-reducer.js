import { combineReducers } from "redux";

import authReducer from "./../modules/auth/reducers/auth";

export default combineReducers({
  auth: authReducer
});
