/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import { push } from "redux-first-router";
import {
  AUTH_CHECK,
  AUTH_ECHO_SETUP,
  USER_LOAD,
  AUTH_USER,
  UPDATE_COINS
} from "./action-types";
import AsyncRequest from "../../../utils/AsyncRequest";

import { normalize, schema } from "normalizr";

export function authCheck() {
  return {
    type: AUTH_CHECK
  };
}

export const userLoad = () => {
  return AsyncRequest.createSimpleRequestFromObject(USER_LOAD, {
    path: `/api/users`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return {
        ...response.profiles
      };
    }
  });
};

export const updateCoins = payload => {
  return AsyncRequest.createSimpleRequestFromObject(UPDATE_COINS, {
    path: `/api/wallet/coin/update`,
    data: payload,
    method: "post",
    normalize: response => {
      return {
        ...response.profiles
      };
    }
  });
};

export const authUser = payload => {
  return {
    type: AUTH_USER,
    payload
  };
};

export const authEchoSetup = payload => {
  return {
    type: AUTH_ECHO_SETUP,
    payload
  };
};
