import { ClientParams } from './types'
import { Relayer } from './Relayer'

export function createUser(email: string) {}

export function createRelayClient(params: ClientParams): Relayer {
  return new Relayer(params)
}
