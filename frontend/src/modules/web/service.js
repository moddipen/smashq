import { all, call, put, takeEvery } from 'redux-saga/effects'
import { REQUEST } from './store/action-types'
import Service from '../../utils/Service'
import { addAlert } from './store/actions'
import Transformer from '../../utils/Transformer'

/**
 * @param {AsyncRequest} request
 */
function * request (request) {
  try {
    let response = yield call(Service.requestAsync, request.path, request.method, request.data)

    if (request.showSuccessNotification && response.message) {
      yield put(addAlert({
        message: response.message,
        headline: 'Success',
        type: 'success'
      }))
    }
    const data = request.responseField ? response[request.responseField] : response
    yield put({
      type: request.successAction,
      payload: request.normalize !== null ? request.normalize(data) : data
    })
    if (request.additionalSuccessActions && request.additionalSuccessActions.length > 0) {
      for (let i = 0; i < request.additionalSuccessActions.length; i++) {
        const action = request.additionalSuccessActions[i]
        const actionResponse = action.field ? data[action.field] : data
        if (action.function !== undefined) {
          yield put(action.function(actionResponse))
        } else {
          yield put({
            type: action.type,
            payload: action.camelCase ? Transformer.send(actionResponse) : actionResponse
          })
        }
      }
    }
    if (request.successCallback) {
      yield call(request.successCallback, data)
    }
  } catch (error) {
    console.log(error)
    yield put({type: request.errorAction, payload: request})
    if (request.showErrorNotification && error && error.message) {
      yield put(addAlert({
        message: error.message,
        headline: 'Error',
        type: 'danger'
      }))
    }
    if (request.errorCallback) {
      yield call(request.errorCallback, request)
    }
  }
}

function * watchAll () {
  yield all([
    takeEvery(REQUEST, request)
  ])
}

export default watchAll