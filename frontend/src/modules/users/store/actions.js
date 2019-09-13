/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */

import { normalize, schema } from "normalizr";
import { USER_LOAD, INITIAL_SEARCH_USER, SEARCH_USER } from "./action-types";
import AsyncRequest from "../../../utils/AsyncRequest";

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

export const initialSearch = () => {
  return AsyncRequest.createSimpleRequestFromObject(INITIAL_SEARCH_USER, {
    path: `/api/users/lists`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return response;
    }
  });
};

export const searchUser = payload => {
  return AsyncRequest.createSimpleRequestFromObject(SEARCH_USER, {
    path: `/api/users/search`,
    data: payload,
    method: "post",
    responseField: "data",
    normalize: response => {
      return response;
    }
  });
};
