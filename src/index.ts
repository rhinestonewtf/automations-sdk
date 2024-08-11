import { ClientParams } from './types'
import { Automation } from './Automation'

export function createAutomationClient(params: ClientParams): Automation {
  return new Automation(params)
}
