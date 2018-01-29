const authUri = 'http://localhost:3000/auth'

export async function authenticate() {
  const response = await fetch(authUri)
  console.log("Response is: ", response)
  if(response.status === 200) {
    return response.json()
  }
}

export async function fetchNewsAPI() {
  return []
}
