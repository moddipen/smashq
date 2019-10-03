import { AUTHUSER_POST_SUCCESS } from "./action-types"

const initialState = {}

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case AUTHUSER_POST_SUCCESS:
      return getuserPosts(state, payload)
    default:
      return state
  }
}

function getuserPosts(state, payload) {
  return Object.assign({}, payload.posts)
}

export default reducer
