import { ActionTypes } from "../constants/Types"

const initialState = {
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_TOKEN: {
      return {...state, token: action.token}
    }
    default: {
      return state
    }
  }
}
