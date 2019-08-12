import { ALERT_ADDED, ALERT_REMOVED } from '../action-types'
import * as _ from 'lodash'

const initialState = []

const reducer = (state = initialState, {type, payload = null}) => {
  switch (type) {
    case ALERT_ADDED:
      return addAlert(state, payload)
    case ALERT_REMOVED:
      return removeAlert(state, payload)
    default:
      return state
  }
}

function addAlert (state, payload) {
  let id = 1
  const lastElement = _.last(state)
  if (lastElement) {
    id = lastElement.id + 1
  }
  payload.id = id
  return [...state, payload]
}

function removeAlert (state, payload) {
  state = _.without(state, payload)

  return state
}

export default reducer
