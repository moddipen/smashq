import HTTP from "../../../utils/Http"
import {
  AUTH_CHECK,
  AUTH_ECHO_SETUP,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_SOCIAL_MEDIA_SUCCESS,
  UPDATE_COINS_SUCCESS,
  AUTH_LOGIN_ERROR,
  UPDATE_SETTINGS_SUCCESS
} from "./action-types"
import { USER_LOAD_SUCCESS } from "../../users/store/action-types"

const initialState = {
  isAuthenticated: false,
  isEchoSetup: false,
  checked: false,
  initialLoad: false,
  userId: 0,
  authUser: {}
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTH_REFRESH_TOKEN:
    case AUTH_LOGIN_SUCCESS:
      return login(state, payload)
    case AUTH_REGISTER_SUCCESS:
      return register(state, payload)
    case AUTH_ECHO_SETUP:
      return echoSetup(state, payload)
    case AUTH_CHECK:
      return checkAuth(state)
    case AUTH_LOGOUT_SUCCESS:
      return logout(state)
    case AUTH_RESET_PASSWORD:
      return resetPassword(state)
    case USER_LOAD_SUCCESS:
      return userLoad(state, payload)
    case UPDATE_PROFILE_SUCCESS:
      return userLoad(state, payload)
    case UPDATE_SOCIAL_MEDIA_SUCCESS:
      return userLoad(state, payload)
    case UPDATE_SOCIAL_MEDIA_SUCCESS:
      return userLoad(state, payload)
    case UPDATE_COINS_SUCCESS:
      return updateCoins(state, payload)
    case UPDATE_SETTINGS_SUCCESS:
      return userSettings(state, payload)
    default:
      return state
  }
}

function echoSetup(state, payload) {
  return Object.assign({}, state, {
    isEchoSetup: payload
  })
}

function userLoad(state, payload) {
  return {
    ...state,
    isAuthenticated: true,
    checked: true,
    userId: payload.id,
    initialLoad: true,
    authUser: payload
  }
}

function login(state, payload) {
  if (payload.accessToken) {
    localStorage.setItem("access_token", payload.accessToken)
    HTTP.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${payload.accessToken}`
    return {
      ...state,
      isAuthenticated: true,
      checked: true,
      initialLoad: true,
      authUser: payload,
      userId: payload.id
    }
  } else {
    return {
      ...state,
      isAuthenticated: false,
      checked: false,
      initialLoad: true,
      authUser: payload,
      userId: payload.id
    }
  }
}

function register(state, payload) {
  return {
    ...state,
    isAuthenticated: false,
    checked: false,
    isEchoSetup: false
  }
}

function checkAuth(state) {
  state = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem("access_token"),
    checked: true
  })

  if (state.isAuthenticated) {
    HTTP.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access_token")}`
  }
  return state
}

function logout(state) {
  localStorage.removeItem("access_token")
  return {
    ...state,
    isAuthenticated: false,
    checked: false,
    isEchoSetup: false
  }
}

function updateCoins(state, payload) {
  let obj = state.authUser
  obj.coins = payload.coins
  return {
    ...state,
    authUser: obj
  }
}

function userSettings(state, payload) {
  let obj = state.authUser
  obj.subOnFollow = payload.subOnFollow
  obj.subamount = payload.amount
  return {
    ...state,
    authUser: obj
  }
}

function resetPassword(state) {
  return {
    ...state,
    resetPassword: true,
    checked: false
  }
}

export const getAuth = state => state.auth.isAuthenticated
export default reducer
