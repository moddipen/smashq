import {
  USER_LOAD_SUCCESS,
  INITIAL_SEARCH_USER_SUCCESS,
  SEARCH_USER_SUCCESS
} from "./action-types";

const initialState = {};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case USER_LOAD_SUCCESS:
    // return loadSuccess(state, payload);
    case INITIAL_SEARCH_USER_SUCCESS:
      return setUsers(state, payload);
    case SEARCH_USER_SUCCESS:
      return setReplaceUsers(state, payload);
    default:
      return state;
  }
};

function loadSuccess(state, payload) {
  return window._.merge({}, state, payload.entities.users);
}

function setUsers(state, payload) {
  return window._.merge({}, state, payload.users);
}

function setReplaceUsers(state, payload) {
  return { ...state, ...payload.users };
}

export default reducer;
