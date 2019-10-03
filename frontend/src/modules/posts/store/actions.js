/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import { push } from "redux-first-router"
import { normalize, schema } from "normalizr"
import { AUTHUSER_POST } from "./action-types"
import AsyncRequest from "../../../utils/AsyncRequest"

export const getAuthUserPosts = () => {
  return AsyncRequest.createSimpleRequestFromObject(AUTHUSER_POST, {
    path: `/api/posts`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return response
    }
  })
}
