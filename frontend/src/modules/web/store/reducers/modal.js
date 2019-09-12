import { MODAL_CHANGED, MODAL_CLOSE } from '../action-types'

const initialState = {}

const reducer = (state = initialState, {type, payload = null}) => {
  switch (type) {
    case MODAL_CHANGED:
      return updateModal(state, payload)
    case MODAL_CLOSE:
      return initialState
    default:
      return state
  }
}

function updateModal (state, payload) {
  if (typeof(payload) === 'object') {
    return Object.assign({}, payload)
  }

  return state
}

export default reducer
