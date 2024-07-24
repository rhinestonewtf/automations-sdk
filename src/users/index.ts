import { RELAYER_BASE_URL } from '../constants'

export type User = {
  id: string
  email: string
  apiKey: string
}

const createUser = async (email: string): Promise<User> => {
  const res = await fetch(`${RELAYER_BASE_URL}/users/create`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email }),
  })
  return res.json()
}
