import { push } from "redux-first-router";
import Http from "../../utils/Http";
import * as authActions from "./store/actions";
import Transformer from "../../utils/Transformer";
import { normalize, schema } from "normalizr";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { AUTH_LOGIN, AUTH_LOGOUT } from "./store/action-types";

/**
 * fetch the current logged in user
 *
 * @returns {function(*)}
 */
export function* fetchUser() {
  try {
    const user = yield call(getUser);

    yield put(authActions.authUser(user));
  } catch (error) {
    console.log(error);
  }
}

function getUser() {
  return new Promise((resolve, reject) => {
    Http.get("user")
      .then(res => {
        if (res.data.success) {
          const data = normalize(
            Transformer.fetch(res.data.data),
            new schema.Entity("users")
          );
          return resolve(data);
        }
        return reject(res.data);
      })
      .catch(err => {
        console.log(err);
        return reject(err);
      });
  });
}

function* watchAll() {
  yield all([takeEvery(AUTH_LOGIN, login), takeEvery(AUTH_LOGOUT, logout)]);
}

export default watchAll;
