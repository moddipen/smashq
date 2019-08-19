import { USER_LOAD_SUCCESS } from "./action-types";

const initialState = {};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case USER_LOAD_SUCCESS:
      return loadSuccess(state, payload);
    default:
      return state;
  }
};

function loadSuccess(state, payload) {
  return window._.merge({}, state, payload.entities.users);
}

export default reducer;
