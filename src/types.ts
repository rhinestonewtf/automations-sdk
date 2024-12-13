import { Address, Hex } from 'viem'
import { ALLOWED_VALIDATORS } from './constants'

export type Validator =
  (typeof ALLOWED_VALIDATORS)[keyof typeof ALLOWED_VALIDATORS]

export type ClientParams = {
  apiKey: string
  validator: Validator
  permissionId?: string
  network: number
  account: Address
  accountType: 'SAFE' | 'KERNEL' | 'NEXUS'
  accountInitCode: Hex
}

type StaticAction = {
  type: 'static'
  target: Address
  value: number
  callData: Hex
}

type DynamicAction = {
  type: 'dynamic'
  target: Address
  value: number
  callDataBuilderUrl: string
  functionSelector: Hex
  params?: {
    static?: Record<string, any>
    dynamic?: Record<string, any>
  }
}

export type Action = StaticAction | DynamicAction

export type TimeBasedTrigger = {
  triggerData: {
    cronExpression: string
    startDate: number
  }
}

export type EventBasedTrigger = {
  triggerData: {
    query: string
  }
}

export type CreateTimeBasedTriggerParams = {
  trigger: TimeBasedTrigger
  actions: Action[]
  maxNumberOfExecutions: number
}

export type CreateEventBasedTriggerParams = {
  trigger: EventBasedTrigger
  actions: Action[]
  maxNumberOfExecutions: number
}

export type Automation =
  | {
      type: 'time-based'
      data: CreateTimeBasedTriggerParams
    }
  | {
      type: 'event-based'
      data: CreateEventBasedTriggerParams
    }

export type SignAutomationParams = {
  automationId: string
  signature: Hex
}

export type AutomationResponse = {
  id: string
  account: string
  hash: Hex
  validator: string
  network: number
  maxNumberOfExecutions: number
  numberOfExecutionsExecuted: number
  actions: any
  trigger: any
  active: boolean
  signed: boolean
}
