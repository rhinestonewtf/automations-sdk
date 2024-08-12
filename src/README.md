# Automations SDK

![Coverage badge lines](https://raw.githubusercontent.com/rhinestonewtf/automations-sdk/main/badges/badge-lines.svg)
![Coverage badge functions](https://raw.githubusercontent.com/rhinestonewtf/automations-sdk/main/badges/badge-functions.svg)

**A TypeScript library for using Rhinestone Automations**

The Rhinestone Automations Service allows you to create automations that will be executed on a smart account based on a trigger. Exisiting triggers include:

- **Time-based trigger**: Execute an automation at a specified time interval
- **Event-based trigger**: Execute an automation based on an event emitted onchain

This SDK makes it easy to interact with the Rhinestone Automations Service and create, sign and manage automations.

## Using the Automations SDK

### Installation

Install the Automations SDK:

```bash
npm install @rhinestone/automations-sdk
```

```bash
pnpm install @rhinestone/automations-sdk
```

```bash
yarn add @rhinestone/automations-sdk
```

```bash
bun install @rhinestone/automations-sdk
```

### Quick Start


```typescript
// Import the required functions
import {
  createAutomationClient,
} from '@rhinestone/automations-sdk'

// Create a client for the automations service
const automationsClient = createAutomationClient({
      account: "0xc2b17e73603dccc195118a36f3203134fd7985f5",
      apiKey: process.env.AUTOMATIONS_API_KEY!,
      accountInitCode: '0x',
      network: 11155111,
      validator: '0x503b54Ed1E62365F0c9e4caF1479623b08acbe77',
})

// Create a new automation
const automation = await automationsClient.createAutomation({
      type: 'time-based',
      data: {
        trigger: {
          triggerData: {
            cronExpression: '*/30 * * * * *',
            startDate: new Date().getTime(),
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

// Sign the automation to active it
const signature = sign(automation.hash) // Sign the hash of the automation with the account

await automationsClient.signAutomation({
      automationId: automation.id,
      signature: signature,
})

// Get the automation and verify that it is active
automation = await automationsClient.getAutomation(
      automationId: automation.id,
)

console.log(automation.status) // active
```

## Using this repo

To install dependencies, run:

```bash
pnpm install
```

To build the sdk, run:

```bash
pnpm build
```

To run tests, run:

```bash
pnpm test
```

## Contributing

For feature or change requests, feel free to open a PR, start a discussion or get in touch with us.
