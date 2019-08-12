import { redirect } from 'redux-first-router'

import routesMap from '../routes/routes'
import { updatePage, updateDetail } from '../modules/web/store/actions'

const isAllowed = (type, state) => {
  const requiresAuth = routesMap[type] && routesMap[type].auth
  if (!requiresAuth) return true

  return state.auth && state.auth.isAuthenticated
}

const process = (dispatch, state, action) => {
  const allowed = isAllowed(action.type, state)

  if (state.auth.checked && !allowed && action.type !== 'LOGIN') {
    dispatch(redirect({type: 'LOGIN'}))
  } else if (state.auth.checked && state.auth.isAuthenticated && action.type === 'LOGIN') {
    dispatch(redirect({type: 'HOME'}))
  } else {
    dispatch(updatePage({name: action.type, params: action.payload}))
  }
}

export default {
  initialDispatch: false,
  onBeforeChange: (dispatch, getState, {action}) => {
    const state = getState()
    process(dispatch, state, action)
  },
  onAfterChange: (dispatch, getState, {action}) => {
  }
}