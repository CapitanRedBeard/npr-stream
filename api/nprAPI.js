import { HTTPCodes } from '../constants/Types'

const authUri = 'http://localhost:3000/auth'
const recommendationsUri = 'https://api.npr.org/listening/v2/recommendations'

export async function authenticate() {
  const response = await fetch(authUri)
  if(response.status === HTTPCodes.OK) {
    return response.json()
  }
}

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
