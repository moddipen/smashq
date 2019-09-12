import { QUICK_BAR_CHANGED } from '../action-types'

const initialState = {
  name: null,
  params: {}
}

const reducer = (state = initialState, {type, payload = null}) => {
  switch (type) {
    case QUICK_BAR_CHANGED:
      return updateQuickBar(state, payload)
    default:
      return state
  }
}

function updateQuickBar (state, payload) {
  return Object.assign({}, payload)
}

export default reducer
