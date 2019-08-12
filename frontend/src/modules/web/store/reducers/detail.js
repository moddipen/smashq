import { DETAIL_CHANGED } from '../action-types'

const initialState = {
  name: null,
  params: {}
}

const reducer = (state = initialState, {type, payload = null}) => {
  switch (type) {
    case DETAIL_CHANGED:
      return updateDetail(state, payload)
    default:
      return state
  }
}

function updateDetail (state, payload) {
  return Object.assign({}, payload);
}

export default reducer