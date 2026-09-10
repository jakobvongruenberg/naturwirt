import { AuthError } from 'next-auth'

export default class UserNotFoundAuthError extends AuthError {
  constructor() {
    super('User not found.')

    this.name = 'UserNotFoundAuthError'

    Object.setPrototypeOf(this, UserNotFoundAuthError.prototype)
  }
}
