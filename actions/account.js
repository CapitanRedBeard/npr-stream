import { ActionTypes } from "../constants/Types"

export function storeToken(token) {
  return {
    type: ActionTypes.STORE_TOKEN,
    token
  }
}
