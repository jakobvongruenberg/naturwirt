import { AuthError } from 'next-auth'

export default class InvalidPayloadAuthError extends AuthError {
  constructor() {
    super('Invalid credentials.')

    this.name = 'InvalidPayloadAuthError'

    Object.setPrototypeOf(this, InvalidPayloadAuthError.prototype)
  }
}
