/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import { push } from "redux-first-router"
import { normalize, schema } from "normalizr"
import { AUTHUSER_POST, POST_LIKE, USERS_POST } from "./action-types"
import AsyncRequest from "../../../utils/AsyncRequest"

export const getAuthUserPosts = () => {
  return AsyncRequest.createSimpleRequestFromObject(AUTHUSER_POST, {
    path: `/api/auth/posts`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return response
    }
  })
}

export const getUserPosts = () => {
  return AsyncRequest.createSimpleRequestFromObject(USERS_POST, {
    path: `/api/posts`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return response
    }
  })
}

export const likePost = payload => {
  return AsyncRequest.createSimpleRequestFromObject(POST_LIKE, {
    path: `/api/post/like`,
    data: payload,
    method: "post",
    responseField: "data",
    normalize: response => {
      push("/")
      return response
    }
  })
}
