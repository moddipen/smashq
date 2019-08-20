/* eslint-disable no-console */
import axios from "axios";
import { API_URL } from "../contants/config";

const URL = API_URL;

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
