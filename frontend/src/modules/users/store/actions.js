/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */

import { normalize, schema } from "normalizr";
import { USER_LOAD } from "./action-types";
import AsyncRequest from "../../../utils/AsyncRequest";

export const userLoad = () => {
  return AsyncRequest.createSimpleRequestFromObject(USER_LOAD, {
    path: `/api/users`,
    method: "get",
    responseField: "data",
    normalize: response => {
      return {
        id: response.id
      };
    }
  });
};
