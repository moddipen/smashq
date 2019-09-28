/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import { push } from "redux-first-router"
import { normalize, schema } from "normalizr"
import {
  USER_LOAD,
  INITIAL_SEARCH_USER,
  SEARCH_USER,
  FOLLOW_STATUS,
  GET_USER_PROFILE
} from "./action-types"
import AsyncRequest from "../../../utils/AsyncRequest"

export const userLoad = () => {
  return AsyncRequest.createSimpleRequestFromObject(USER_LOAD, {
    path: `/api/users`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return {
        ...response.profiles
      }
    }
  })
}

export const initialSearch = () => {
  return AsyncRequest.createSimpleRequestFromObject(INITIAL_SEARCH_USER, {
    path: `/api/users/lists`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return response
    }
  })
}

export const followStatus = payload => {
  return AsyncRequest.createSimpleRequestFromObject(FOLLOW_STATUS, {
    path: `/api/users/follows`,
    data: payload,
    method: "post",
    responseField: "data",
    normalize: response => {
      if (response.users.status === "follow") {
        if (
          response.users.subOnFollow === 1 ||
          response.users.subOnFollow === "1"
        ) {
          push("/transactions?limit=5")
        }
      }

      return response
    }
  })
}

export const searchUser = payload => {
  return AsyncRequest.createSimpleRequestFromObject(SEARCH_USER, {
    path: `/api/users/search`,
    data: payload,
    method: "post",
    responseField: "data",
    normalize: response => {
      return response
    }
  })
}

export const getuserProfile = id => {
  return AsyncRequest.createSimpleRequestFromObject(GET_USER_PROFILE, {
    path: `/api/users/user-profile/` + id,
    method: "get",
    responseField: "data",
    normalize: response => {
      return response
    }
  })
}
