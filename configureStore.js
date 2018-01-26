import { compose, createStore, applyMiddleware } from 'redux'

import { logger } from "redux-logger"
import thunk from 'redux-thunk';

import reducers from './reducers'
const middlewares = [thunk]

middlewares.push(logger)

export default function configureStore() {
  return createStore(reducers, {}, applyMiddleware(...middlewares))
}
