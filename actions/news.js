import { ActionTypes } from "../constants/Types"
import { fetchNewsAPI } from '../api/newsAPI'

function updateNews(news) {
  return {
    type: ActionTypes.FETCH_NEWS,
    news
  }
}

export function fetchNews() {
  return async dispatch =>  dispatch(updateNews(await fetchNewsAPI()))
}
