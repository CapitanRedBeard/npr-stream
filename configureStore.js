import { createStore, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from "redux-logger"
import thunk from 'redux-thunk';

import reducers from './reducers'
const middlewares = [thunk]

middlewares.push(createLogger())

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['account']
};

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
  const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares))
  const persistor = persistStore(store)
  return { store, persistor }
}
