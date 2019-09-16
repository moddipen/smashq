import {
  INITIAL_SEARCH_USER_SUCCESS,
  SEARCH_USER_SUCCESS,
  FOLLOW_STATUS_SUCCESS
} from "./action-types";

const initialState = {};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case INITIAL_SEARCH_USER_SUCCESS:
      return setUsers(state, payload);
    case SEARCH_USER_SUCCESS:
      return setUsers(state, payload);
    case FOLLOW_STATUS_SUCCESS:
      return setFollowStatus(state, payload);
    default:
      return state;
  }
};

function setUsers(state, payload) {
  return Object.assign({}, payload.users);
}

function setFollowStatus(state, payload) {
  console.log(payload.users);
  for (var i in state) {
    if (payload.users.status === "follow") {
      if (state[i].id == payload.users.id) {
        state[i].followUserId = payload.users.id;
        break;
      }
    } else {
      if (state[i].id == payload.users.id) {
        state[i].followUserId = null;
        break;
      }
    }
  }
  return Object.assign({}, state);
}

export default reducer;
