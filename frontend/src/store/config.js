import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { connectRoutes } from "redux-first-router"
import { createLogger } from "redux-logger"
import rootReducer from "./reducers"
import routesMap from "../routes/routes"
import options from "./options"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas"
const createHistory = require("history").createBrowserHistory

function checkAuth(state) {
  state = Object.assign({}, state, {
    auth: {
      isAuthenticated: !!localStorage.getItem("access_token"),
      checked: true
    }
  })

  return state
}

const history = createHistory()

const { reducer, middleware, enhancer, initialDispatch } = connectRoutes(
  history,
  routesMap,
  options
)

const combinedReducer = combineReducers({ ...rootReducer, location: reducer })

const sagaMiddleware = createSagaMiddleware()

const storeConfig = () => {
  const initialState = checkAuth({})
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(middleware),
    applyMiddleware(sagaMiddleware)
  ]

  if (process.env.NODE_ENV !== "production") {
    enhancers.push(applyMiddleware(createLogger()))
    window.devToolsExtension && enhancers.push(window.devToolsExtension())
  }
  const store = createStore(
    combinedReducer,
    initialState,
    compose(
      enhancer,
      ...enhancers
    )
  )
  sagaMiddleware.run(rootSaga)
  initialDispatch()

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default storeConfig
