import { ClientParams } from './types'
import { Automation } from './Automation'

export { ALLOWED_VALIDATORS } from './constants'

export function createAutomationClient(params: ClientParams): Automation {
  return new Automation(params)
}
