import {
  INITIAL_SEARCH_USER_SUCCESS,
  SEARCH_USER_SUCCESS
} from "./action-types";

const initialState = {};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case INITIAL_SEARCH_USER_SUCCESS:
      return setUsers(state, payload);
    case SEARCH_USER_SUCCESS:
      return setUsers(state, payload);
    default:
      return state;
  }
};

function setUsers(state, payload) {
  return Object.assign({}, payload.users);
}

export default reducer;
