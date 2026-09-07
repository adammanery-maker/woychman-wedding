import { randomBytes } from 'node:crypto'

export function generateInvitationCode() {
  return randomBytes(16).toString('hex').toUpperCase()
}
