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

export function* login({ type, payload = null }) {
  try {
    const accessToken = yield call(loginRequest, payload);

    yield put(authActions.authLogin(accessToken));
    yield call(push, "/");
  } catch (error) {
    console.log(error);
  }
}

function loginRequest(credentials) {
  return new Promise((resolve, reject) => {
    Http.post("login", credentials)
      .then(res => {
        const data = Transformer.fetch(res.data);
        return resolve(data.accessToken);
      })
      .catch(err => {
        const statusCode = err.response.status;
        const data = {
          error: null,
          statusCode
        };

        if (statusCode === 422) {
          const resetErrors = {
            errors: err.response.data.errors,
            replace: false,
            searchStr: "",
            replaceStr: ""
          };
          data.error = Transformer.resetValidationFields(resetErrors);
        } else if (statusCode === 401) {
          data.error = err.response.data.message;
        }
        return reject(data);
      });
  });
}

export function logoutRequest() {
  return new Promise((resolve, reject) => {
    Http.delete("/logout")
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject();
      });
  });
}

export function* logout() {
  try {
    yield call(logoutRequest);
    yield put(authActions.authLogout());
    push("/login");
  } catch (error) {
    console.log(error);
  }
}

function* watchAll() {
  yield all([takeEvery(AUTH_LOGIN, login), takeEvery(AUTH_LOGOUT, logout)]);
}

export default watchAll;
