export default class InvalidPayloadError extends Error {
  constructor() {
    super('Invalid credentials.')

    this.name = 'InvalidPayloadError'

    Object.setPrototypeOf(this, InvalidPayloadError.prototype)
  }
}
