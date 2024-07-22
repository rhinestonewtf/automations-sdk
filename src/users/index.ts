import { RELAYER_BASE_URL } from '../constants'

export type UserResponse = {
  id: string
  email: string
  apiKey: string
}

export const createUser = async (email: string): Promise<UserResponse> => {
  const res = await fetch(`${RELAYER_BASE_URL}/users/create`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email }),
  })
  return res.json()
}
