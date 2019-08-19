/* eslint-disable no-console */
import axios from "axios";

const URL = "http://localhost:5000";

axios.defaults.baseURL = URL;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // store.dispatch(authLogout())
    }
    return Promise.reject(error);
  }
);

export default axios;
