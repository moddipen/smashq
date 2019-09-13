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
  UPDATE_PROFILE,
  UPDATE_SOCIAL_MEDIA
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

export const updateProfile = payload => {
  return AsyncRequest.createSimpleRequestFromObject(UPDATE_PROFILE, {
    path: `/api/users/update`,
    data: payload,
    method: "post",
    onSuccess: () => {
      push("/edit-profile");
    }
  });
};

export const updateSocialMedia = payload => {
  return AsyncRequest.createSimpleRequestFromObject(UPDATE_SOCIAL_MEDIA, {
    path: `/api/users/social/update`,
    data: payload,
    method: "post",
    onSuccess: () => {
      push("/social-media");
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
