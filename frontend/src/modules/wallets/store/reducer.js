import { UPDATE_COINS_SUCCESS } from "../../users/store/action-types";

const initialState = {};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case UPDATE_COINS_SUCCESS:
      return updateCoins(state, payload);
    default:
      return state;
  }
};

function updateCoins(state, payload) {
  state.auth.authUser.coins = payload.coins;
  return Object.assign({}, state);
}

export default reducer;
