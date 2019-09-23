import {
  TRANSACTION_LOAD_SUCCESS,
  UPDATE_COINS_SUCCESS
} from "../../wallets/store/action-types";
import { push_uniq } from "terser";
import { push } from "redux-first-router";
const initialState = {
  transactions: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case TRANSACTION_LOAD_SUCCESS:
      return setTransaction(state, payload);
    //  case UPDATE_COINS_SUCCESS:
    ///    return updateCoinSuccess(state, payload);
    default:
      return state;
  }
};

function setTransaction(state, payload) {
  return {
    ...state,
    transactions: payload
  };
}

// function updateCoinSuccess(state, payload) {
//   push("/transactions");
// }

export default reducer;
