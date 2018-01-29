import { combineReducers } from "redux"

import news from "./news"
import account from "./account"

export default combineReducers({
  news,
  account
})
