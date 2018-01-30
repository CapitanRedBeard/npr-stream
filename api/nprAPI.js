import { HTTPCodes } from '../constants/Types'

const recommendationsUri = 'https://api.npr.org/listening/v2/recommendations'

export async function fetchNewsAPI(token) {
  const response = await fetch(recommendationsUri, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
  })
  if(response.status === HTTPCodes.OK) {
    return response.json()
  }
}
