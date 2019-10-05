import { AUTHUSER_POST_SUCCESS, USERS_POST_SUCCESS } from "./action-types"

const initialState = {}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTHUSER_POST_SUCCESS:
      return getauthuserPosts(state, payload)
    case USERS_POST_SUCCESS:
      return getuserPosts(state, payload)
    default:
      return state
  }
}

function getuserPosts(state, payload) {
  return Object.assign({}, payload.posts)
}

function getauthuserPosts(state, payload) {
  return Object.assign({}, payload.authposts)
}

export default reducer
