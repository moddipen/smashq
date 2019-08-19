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
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD,
  AUTH_USER,
  USER_LOAD
} from "./action-types";
import AsyncRequest from "../../../utils/AsyncRequest";
import { userLoad } from "../../users/store/actions";

export function authCheck() {
  return {
    type: AUTH_CHECK
  };
}

export function authLogin(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_LOGIN, {
    path: `/auth/login`,
    data: payload,
    method: "post",
    additionalSuccessActions: [
      {
        function: userLoad
      }
    ],
    onSuccess: () => {
      push("/");
    }
  });
}

export function authLogout() {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_LOGOUT, {
    path: `/api/users/logout`,
    method: "delete",
    onSuccess: () => {
      push("/login");
    }
  });
}

export function authResetPassword() {
  return {
    type: AUTH_RESET_PASSWORD
  };
}

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
