import HTTP from "../../../utils/Http";
import {
  AUTH_CHECK,
  AUTH_ECHO_SETUP,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD
} from "./action-types";
import {
  SEARCH_RESULT_SUCCESS,
  REMOVE_SEARCH_SUCCESS
} from "../../chat-search/store/action.types";
import { BROWSE_LEAVE_SUCCESS } from "../../channels/store/action-types";
import { USER_LOAD_SUCCESS } from "../../users/store/action-types";

const initialState = {
  isAuthenticated: false,
  isEchoSetup: false,
  checked: false,
  initialLoad: false,
  userId: 0,
  companyId: 0,
  apiKeys: {},
  chatSearches: [],
  companyChannels: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTH_REFRESH_TOKEN:
    case AUTH_LOGIN_SUCCESS:
      return login(state, payload);
    case AUTH_ECHO_SETUP:
      return echoSetup(state, payload);
    case AUTH_CHECK:
      return checkAuth(state);
    case AUTH_LOGOUT_SUCCESS:
      return logout(state);
    case AUTH_RESET_PASSWORD:
      return resetPassword(state);
    case USER_LOAD_SUCCESS:
      return userLoad(state, payload);
    case SEARCH_RESULT_SUCCESS:
      return resetSerches(state, payload);
    case REMOVE_SEARCH_SUCCESS:
      return resetSerches(state, payload);
    case BROWSE_LEAVE_SUCCESS:
      return setCompanyChannels(state, payload);
    default:
      return state;
  }
};

function echoSetup(state, payload) {
  return Object.assign({}, state, {
    isEchoSetup: payload
  });
}

function userLoad(state, payload) {
  return {
    ...state,
    isAuthenticated: true,
    checked: true,
    userId: payload.id,
    companyId: payload.companyId,
    apiKeys: payload.apiKeys,
    chatSearches: payload.chatSearches,
    initialLoad: true
  };
}

function login(state, payload) {
  return {
    ...state,
    isAuthenticated: true,
    checked: true,
    initialLoad: false
  };
}

function checkAuth(state) {
  state = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem("access_token"),
    checked: true
  });

  if (state.isAuthenticated) {
    HTTP.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access_token")}`;
  }

  return state;
}

function logout(state) {
  return {
    ...state,
    isAuthenticated: false,
    checked: false,
    isEchoSetup: false
  };
}

function resetPassword(state) {
  return {
    ...state,
    resetPassword: true,
    checked: false
  };
}

function resetSerches(state, payload) {
  return {
    ...state,
    chatSearches: payload.chatSearches
  };
}

function setCompanyChannels(state, payload) {
  return {
    ...state,
    companyChannels: payload.companyChannels
  };
}

export const getAuth = state => state.auth.isAuthenticated;

export default reducer;
