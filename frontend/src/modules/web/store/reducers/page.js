import { PAGE_CHANGED } from '../action-types'

const initialState = {
  name: null,
  params: {}
}

const reducer = (state = initialState, {type, payload = null}) => {
  switch (type) {
    case PAGE_CHANGED:
      return updatePage(state, payload)
    default:
      return state
  }
}

function updatePage (state, payload) {
  return Object.assign({}, payload)
}

export default reducer
