import { compose, createStore, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { logger } from "redux-logger"
import thunk from 'redux-thunk';

import reducers from './reducers'
const middlewares = [thunk]

middlewares.push(logger)

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['account']
};

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
