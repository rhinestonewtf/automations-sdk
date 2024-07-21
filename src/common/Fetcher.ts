export class Fetcher {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async fetch(url: string, options?: RequestInit): Promise<Response> {
    const headers = {
      ...options?.headers,
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    }

    const updatedOptions = {
      ...options,
      headers,
    }

    const res = await fetch(url, updatedOptions)
    return res.json()
  }
}
