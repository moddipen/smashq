import { all, fork } from 'redux-saga/effects'

import authSagas from '../modules/auth/service'
import webSagas from '../modules/web/service'

export default function * rootSaga () {
  yield all([
    fork(authSagas),
    fork(webSagas)
  ])
};