import Api from "../../utils/api";
import AuthActionTypes from "../redux/types/auth";
import Token from "../../utils/token";

export const storeUserDataFromToken = (token, dispatch) => {
  setToken(token);

  Api.setAuthToken(token);

  dispatch({
    type: AuthActionTypes.SET_CURRENT_USER,
    payload: Token.getUserFromToken()
  });
};

export const authorizeUser = dispatch => {
  return new Promise((resolve, reject) => {
    const token = Token.getToken();
    if (!token) {
      resolve(null);
    }

    if (Token.tokenExpired()) {
      logoutUser(dispatch);
      resolve(null);
    }

    Api.setAuthToken(token);

    Api.request("auth.user", null, null, true)
      .then(() => {
        storeUserDataFromToken(token, dispatch);
        resolve(true);
      })
      .catch(() => resolve(false));
  });
};

export const logoutUser = dispatch => {
  Token.removeToken();

  dispatch({
    type: AuthActionTypes.LOGOUT_USER,
    payload: null
  });
};
