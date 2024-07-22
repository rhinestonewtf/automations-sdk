import { ClientParams } from './types'
import { Relayer } from './Relayer'

export { createUser } from './users'

export function createRelayClient(params: ClientParams): Relayer {
  return new Relayer(params)
}
