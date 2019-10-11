import {
  AUTHUSER_POST_SUCCESS,
  USERS_POST_SUCCESS,
  POST_LIKE_SUCCESS
} from "./action-types"

const initialState = {}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTHUSER_POST_SUCCESS:
      return getauthuserPosts(state, payload)
    case USERS_POST_SUCCESS:
      return getuserPosts(state, payload)
    case POST_LIKE_SUCCESS:
      return getpostlikeStatus(state, payload)
    default:
      return state
  }
}

function getpostlikeStatus(state, payload) {
  for (var i in state) {
    if (payload.posts.status === "like") {
      if (state[i].uniqueId === payload.posts.uniqueId) {
        state[i].likeStatus = "1"
      }
    } else {
      if (state[i].uniqueId === payload.posts.uniqueId) {
        state[i].likeStatus = "0"
      }
    }
  }
  return Object.assign({}, state)
}

function getuserPosts(state, payload) {
  // state.users = payload.posts.users
  return Object.assign({}, payload.posts)
}

function getauthuserPosts(state, payload) {
  return Object.assign({}, payload.authposts)
}

export default reducer
