import axios from "axios";
import _ from "lodash";

import API_ENDPOINTS from "./../constants/api";
import Flash, { MessageTypes } from "./flash";
import Token from "./token";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const Api = {
  request(endpoint, params, body, disableTokenCheck) {
    return this.checkTokenExpiration(disableTokenCheck)
      .then(() => {
        return this.send(endpoint, params, body);
      })
      .catch(err => {
        if (err.response.status === 401) {
          Flash(MessageTypes.ERROR, "Please authorize to proceed");

          window.location.href = "/login";
          throw err.response;
        }

        if (err.response.data.message) {
          Flash(MessageTypes.ERROR, err.response.data.message);
        }

        throw err.response;
      });
  },

  send(endpoint, params, body) {
    const { method, url } = _.get(API_ENDPOINTS, endpoint);

    return axios[method](this.url(url, params), body || params)
      .then(res => {
        StoreHelper.clearErrors();

        if (res.data.message) {
          Flash(MessageTypes.SUCCESS, res.data.message);
        }

        if (res.data.info) {
          Flash(MessageTypes.INFO, res.data.info);
        }

        if (res.data.warning) {
          Flash(MessageTypes.WARNING, res.data.warning);
        }

        return res.data;
      })
      .catch(err => {
        throw err;
      });
  },

  url(url, params) {
    url = `${process.env.REACT_APP_API_URL}${url}`;
    if (Number(params) || typeof params === "string") {
      url += `/${params}`;
    } else if (Array.isArray(params)) {
      params.forEach(param => (url += `/${param}`));
    }

    return url;
  },

  checkTokenExpiration(disableTokenCheck) {
    return new Promise((resolve, reject) => {
      if (disableTokenCheck) {
        return resolve(true);
      }

      if (!Token.tokenLeftTenMinutes()) {
        return resolve(true);
      }

      this.send("auth.refresh")
        .then(res => {
          storeUserDataFromToken(res.data.token, StoreHelper.store().dispatch);
          resolve(true);
        })
        .catch(err => reject(err));
    });
  },

  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }
};

export default Api;
