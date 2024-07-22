import { RELAYER_BASE_URL } from '../constants'

export class Fetcher {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async fetch(endpoint: string, options?: RequestInit) {
    const headers = {
      ...options?.headers,
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    }

    const updatedOptions = {
      ...options,
      headers,
    }

    const res = await fetch(`${RELAYER_BASE_URL}/${endpoint}`, updatedOptions)
    return res.json()
  }
}
