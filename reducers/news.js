import { ActionTypes } from "../constants/Types"

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NEWS: {
      if(action.recommendations) {
        return action.recommendations.items
      }
      return state
    }
    default: {
      return state
    }
  }
}
