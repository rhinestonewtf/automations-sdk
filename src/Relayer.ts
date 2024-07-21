import { Fetcher } from './common/Fetcher'
import { Automation, ClientParams, SignAutomationParams } from './types'

export class Relayer {
  private fetcher: Fetcher
  private clientData: ClientParams

  constructor(params: ClientParams) {
    this.fetcher = new Fetcher(params.apiKey)
    this.clientData = params
  }

  async createAutomation(automation: Automation) {}

  async signAutomation({ automationId, signature }: SignAutomationParams) {}

  async deleteAutomation(automationId: string) {}

  async getAutomationLogs(automationId: string) {}

  async deleteUser() {}
}
