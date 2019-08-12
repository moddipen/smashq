import { MENU_CHANGED } from '../action-types'

const initialState = {
  name: null,
  params: {}
}

const reducer = (state = initialState, {type, payload = null}) => {
  switch (type) {
    case MENU_CHANGED:
      return updateMenu(state, payload)
    default:
      return state
  }
}

function updateMenu (state, payload) {
  return Object.assign({}, payload)
}

export default reducer
