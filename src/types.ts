import { Address, Hex } from 'viem'

export type ClientParams = {
  apiKey: string
  validator: Address
  chainId: number
  account: Address
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
  triggerUrl: string
  triggerData: {
    cronExpression: 'string'
    startDate: number
  }
}

export type EventBasedTrigger = {
  triggerUrl: string
  triggerData: {
    query: string
  }
}

export type CreateTimeBasedTriggerParams = TimeBasedTrigger & {
  actions: Action[]
  maxNumberOfExecutions: number
}

export type CreateEventBasedTriggerParams = EventBasedTrigger & {
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
