import { ActionTypes } from "../constants/Types"

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NEWS: {
      return action.news
    }
    default: {
      return state
    }
  }
}
