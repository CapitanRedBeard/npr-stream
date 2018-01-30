import { ActionTypes } from "../constants/Types"
import { fetchNewsAPI } from '../api/nprAPI'

function updateRecommendations(recommendations) {
  return {
    type: ActionTypes.FETCH_NEWS,
    recommendations
  }
}

export function fetchRecommendations(token) {
  return async dispatch => dispatch(updateRecommendations(await fetchNewsAPI(token)))
}
