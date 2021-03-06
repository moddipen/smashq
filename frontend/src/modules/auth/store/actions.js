/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import { push } from "redux-first-router"
import {
  AUTH_CHECK,
  AUTH_ECHO_SETUP,
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_FORGOT_PASSWORD,
  AUTH_VERIFY_CODE,
  AUTH_RESET_PASSWORD,
  AUTH_RESEND_EMAIL,
  AUTH_LOGOUT,
  AUTH_USER,
  AUTH_RESEND_LINK
} from "./action-types"
import AsyncRequest from "../../../utils/AsyncRequest"
import { userLoad } from "../../users/store/actions"
import { normalize, schema } from "normalizr"

export function authCheck() {
  return {
    type: AUTH_CHECK
  }
}

export function authLogin(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_LOGIN, {
    path: `/auth/login`,
    data: payload,
    method: "post",
    onSuccess: response => {
      if (!response.status) {
        localStorage.setItem("username", payload.username)
        push("/verify-account")
      } else {
        push("/")
      }
    }
  })
}

export function authRegister(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_REGISTER, {
    path: `/auth/register`,
    data: payload,
    method: "post",
    onSuccess: () => {
      push("/login")
    }
  })
}

export function authForgotPassword(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_FORGOT_PASSWORD, {
    path: `/auth/forgot-password`,
    data: payload,
    method: "post",
    onSuccess: response => {
      localStorage.setItem("email", response.email)
      push("/verify-code")
    }
  })
}

export function authResendEmail(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_RESEND_EMAIL, {
    path: `/auth/resend-email`,
    data: payload,
    method: "post",
    onSuccess: response => {
      push("/verify-code")
    }
  })
}

export function authVerifyCode(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_VERIFY_CODE, {
    path: `/auth/verify-code`,
    data: payload,
    method: "post",
    onSuccess: response => {
      localStorage.removeItem("email")
      push("/reset-password/" + response.rememberToken)
    }
  })
}

export function authresendLink(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_RESEND_LINK, {
    path: `/auth/resend-link`,
    data: payload,
    method: "post",
    onSuccess: response => {
      localStorage.removeItem("username")
      push("/login")
    }
  })
}

export function authResetPassword(payload) {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_RESET_PASSWORD, {
    path: `/auth/reset-password`,
    data: payload,
    method: "post",
    onSuccess: () => {
      push("/login")
    }
  })
}

export function authLogout() {
  return AsyncRequest.createSimpleRequestFromObject(AUTH_LOGOUT, {
    path: `/api/users/logout`,
    method: "delete",
    onSuccess: () => {
      push("/login")
    }
  })
}

export const authUser = payload => {
  return {
    type: AUTH_USER,
    payload
  }
}

export const authEchoSetup = payload => {
  return {
    type: AUTH_ECHO_SETUP,
    payload
  }
}
