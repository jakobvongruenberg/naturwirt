export const normalizeEmail = (identifier: string) => {
  // Get the first two elements only,
  // separated by `@` from user input.
  // eslint-disable-next-line prefer-const
  let [local, domain] = identifier.toLowerCase().trim().split('@')
  // The part before "@" can contain a ","
  // but we remove it on the domain part
  domain = domain?.split(',')[0]
  return `${local}@${domain}`
}
