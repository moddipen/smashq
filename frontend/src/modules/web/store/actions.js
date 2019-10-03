/* ============
 * Actions for the web module
 * ============
 *
 * The actions that are available on the
 * page module.
 */

import {
  ALERT_ADDED,
  ALERT_REMOVED,
  MENU_CHANGED,
  MODAL_CHANGED,
  PAGE_CHANGED,
  QUICK_BAR_CHANGED,
  DETAIL_CHANGED,
  EVENT_FIRED
} from "./action-types"
import AsyncRequest from "../../../utils/AsyncRequest"
import { push } from "redux-first-router"
import { normalize, schema } from "normalizr"

export const updatePage = payload => {
  if (typeof payload === "string") {
    payload = {
      name: payload,
      params: {}
    }
  }
  return {
    type: PAGE_CHANGED,
    payload
  }
}

export const updateMenu = payload => {
  if (typeof payload === "string") {
    payload = {
      name: payload,
      params: {}
    }
  }
  return {
    type: MENU_CHANGED,
    payload
  }
}

export const updateQuickBar = payload => {
  if (typeof payload === "string") {
    payload = {
      name: payload,
      params: {}
    }
  }
  return {
    type: QUICK_BAR_CHANGED,
    payload
  }
}

export const updateSelectedModal = payload => {
  if (typeof payload === "string") {
    payload = {
      name: payload,
      params: {}
    }
  }
  return {
    type: MODAL_CHANGED,
    payload
  }
}

export const addAlert = payload => {
  return {
    type: ALERT_ADDED,
    payload
  }
}

export const removeAlert = payload => {
  return {
    type: ALERT_REMOVED,
    payload
  }
}

export const updateDetail = payload => {
  return {
    type: DETAIL_CHANGED,
    payload
  }
}

export const eventFired = payload => {
  return {
    type: EVENT_FIRED,
    payload
  }
}
