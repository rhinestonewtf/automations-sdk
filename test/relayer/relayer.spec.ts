import * as dotenv from 'dotenv'
import { createRelayClient } from '../../src/index'
import { Relayer } from '../../src/Relayer'

dotenv.config()

describe('Relayer Service', () => {
  let relayClient: Relayer
  let automationId: string
  const account = '0xc2b17e73603dccc195118a36f3203134fd7985f5'

  beforeAll(async () => {
    relayClient = createRelayClient({
      account,
      apiKey: process.env.RELAYER_API_KEY!,
      accountInitCode: '0x',
      network: 11155111,
      validator: '0x503b54Ed1E62365F0c9e4caF1479623b08acbe77',
    })
  })

  afterAll(async () => {
    // cleanup
    await relayClient.deleteAutomation(automationId)
  })

  it('should create a new automation', async () => {
    const automation = await relayClient.createAutomation({
      type: 'time-based',
      data: {
        trigger: {
          triggerData: {
            cronExpression: '*/30 * * * * *',
          },
        },
        actions: [
          {
            type: 'static',
            target: '0x503b54Ed1E62365F0c9e4caF1479623b08acbe77',
            value: 100,
            callData: '0x',
          },
        ],
        maxNumberOfExecutions: 10,
      },
    })

    automationId = automation.id

    expect(automation).toBeDefined()
    expect(automation.id).toBeDefined()
    expect(automation.hash).toBeDefined()
  })

  it('should sign automation', async () => {
    const automationBeforeSigning = await relayClient.getAutomation(
      automationId,
    )

    expect(automationBeforeSigning.signed).toEqual(false)
    expect(automationBeforeSigning.active).toEqual(false)

    const mockSign =
      '0x503b54Ed1E62365F0c9e4caF1479623b08acbe77f5ce3a1ff65bf16392acfcb800f9b4f1aef1555c7fce5599fffb17e7c635502154a0333ba21f3ae491839af51c'

    const res = await relayClient.signAutomation({
      automationId,
      signature: mockSign,
    })

    expect(res.success).toEqual(true)

    const automation = await relayClient.getAutomation(automationId)

    expect(automation.signed).toEqual(true)
    expect(automation.active).toEqual(true)
  })

  it('should return user active automations', async () => {
    const automations = await relayClient.getActiveAutomations()

    expect(automations.length).toEqual(1)

    const automation = automations[0]
    expect(automation.id).toEqual(automationId)
    expect(automation.active).toEqual(true)
    expect(automation.account).toEqual(account)

    expect(automation.trigger).toBeDefined()
    expect(automation.actions.length).toEqual(1)
  })

  it('should return user account automations', async () => {
    const automations = await relayClient.getAccountAutomations(account)

    expect(automations.length).toEqual(1)

    const automation = automations[0]
    expect(automation.id).toEqual(automationId)
    expect(automation.active).toEqual(true)
    expect(automation.account).toEqual(account)

    expect(automation.trigger.triggerUrl).toBeDefined()
    expect(automation.trigger.triggerData).toBeDefined()
    expect(automation.actions.length).toEqual(1)
  })

  it('should return automation details', async () => {
    const automation = await relayClient.getAutomation(automationId)

    expect(automation.id).toEqual(automationId)
    expect(automation.active).toEqual(true)
    expect(automation.account).toEqual(account)

    expect(automation.trigger.triggerUrl).toBeDefined()
    expect(automation.trigger.triggerData).toBeDefined()
    expect(automation.actions.length).toEqual(1)
  })

  it('should return automation logs', async () => {
    const logs = await relayClient.getAutomationLogs(automationId)
    expect(logs.length).toEqual(0)
  })
})
