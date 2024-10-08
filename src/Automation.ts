import { Address, Hex } from 'viem'
import { Fetcher } from './common/Fetcher'
import {
  Automation as AutomationType,
  AutomationResponse,
  ClientParams,
  SignAutomationParams,
} from './types'
import {
  ALLOWED_VALIDATORS,
  EVENT_BASED_TRIGGER_URL,
  TIME_BASED_TRIGGER_URL,
} from './constants'
import { notReachable } from './common/notReachable'

export class Automation {
  private fetcher: Fetcher
  private clientData: Omit<ClientParams, 'apiKey'>

  constructor(params: ClientParams) {
    if (!this.isValidValidator(params)) {
      throw new Error('Invalid validator')
    }

    const { apiKey, ...clientData } = params
    this.fetcher = new Fetcher(params.apiKey)
    this.clientData = clientData
  }

  async createAutomation(
    automation: AutomationType,
  ): Promise<{ id: string; hash: Hex }> {
    return this.fetcher.fetch('automations/create', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          ...this.clientData,
          ...automation.data,
          trigger: {
            ...automation.data.trigger,
            triggerUrl: this.getTriggerUrl(automation.type),
          },
        },
      }),
    })
  }

  async signAutomation({
    automationId,
    signature,
  }: SignAutomationParams): Promise<{ success: boolean }> {
    return this.fetcher.fetch('automations/sign', {
      method: 'POST',
      body: JSON.stringify({
        id: automationId,
        signature,
      }),
    })
  }

  async getActiveAutomations(): Promise<AutomationResponse[]> {
    const response = await this.fetcher.fetch(
      'automations/get-active-automations',
    )

    return response.map((automation: AutomationResponse) => ({
      ...automation,
      actions: JSON.parse(automation.actions),
      trigger: JSON.parse(automation.trigger),
    }))
  }

  async getAccountAutomations(account: Address): Promise<AutomationResponse[]> {
    const response = await this.fetcher.fetch(`automations/account/${account}`)

    return response.map((automation: AutomationResponse) => ({
      ...automation,
      actions: JSON.parse(automation.actions),
      trigger: JSON.parse(automation.trigger),
    }))
  }

  async getAutomation(automationId: string): Promise<AutomationResponse> {
    const automation = await this.fetcher.fetch(`automations/${automationId}`)

    return {
      ...automation,
      actions: JSON.parse(automation.actions),
      trigger: JSON.parse(automation.trigger),
    }
  }

  async deleteAutomation(automationId: string): Promise<{ id: string }> {
    return this.fetcher.fetch(`automations`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: automationId,
        fullDelete: true,
      }),
    })
  }

  async getAutomationLogs(automationId: string): Promise<{ result: any }[]> {
    return this.fetcher.fetch(`automations/${automationId}/executions`)
  }

  getTriggerUrl(triggerType: 'time-based' | 'event-based') {
    switch (triggerType) {
      case 'time-based':
        return TIME_BASED_TRIGGER_URL
      case 'event-based':
        return EVENT_BASED_TRIGGER_URL
      default:
        throw new Error('Invalid trigger type')
    }
  }

  isValidValidator(params: ClientParams) {
    switch (params.validator) {
      case ALLOWED_VALIDATORS.OWNABLE_VALIDATOR:
      case ALLOWED_VALIDATORS.MOCK_VALIDATOR:
        return true
      case ALLOWED_VALIDATORS.SMART_SESSION_VALIDATOR:
        return !!params.permissionId
      default:
        return notReachable(params.validator)
    }
  }
}
