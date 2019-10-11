import {
  INITIAL_SEARCH_USER_SUCCESS,
  SEARCH_USER_SUCCESS,
  FOLLOW_STATUS_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  LIKEUSERS_LIST_SUCCESS
} from "./action-types"

const initialState = {}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case INITIAL_SEARCH_USER_SUCCESS:
      return setUsers(state, payload)
    case SEARCH_USER_SUCCESS:
      return setUsers(state, payload)
    case FOLLOW_STATUS_SUCCESS:
      return setFollowStatus(state, payload)
    case GET_USER_PROFILE_SUCCESS:
      return getUserProfile(state, payload)
    case LIKEUSERS_LIST_SUCCESS:
      return getusersLike(state, payload)
    default:
      return state
  }
}

function setUsers(state, payload) {
  return Object.assign({}, payload.users)
}

function getusersLike(state, payload) {
  return Object.assign({}, payload.users)
}

function setFollowStatus(state, payload) {
  for (var i in state) {
    if (payload.users.status === "follow") {
      if (state[i].id == payload.users.id) {
        state[i].followUserId = payload.users.id
      }
    } else {
      if (state[i].id == payload.users.id) {
        state[i].followUserId = null
      }
    }
  }
  return Object.assign({}, state)
}

function getUserProfile(state, payload) {
  if (Object.keys(state).length === 0) {
    state[0] = payload.users
  } else {
    for (var i in state) {
      if (payload.users.id === state[i].id) {
        state[i] = payload.users
        break
      }
    }
  }
  return Object.assign({}, state)
}

export default reducer
