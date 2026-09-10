export const makeStringGermanUrlSafe = (str: string) => {
  return str
    .replaceAll(/[^A-Za-z0-9äöüÄÖÜßéèêëÉÈÊËàâáÀÂÁîïÎÏûÛ]/g, '_') // remove bad characters
    .replaceAll(/_+/g, '_')
}

export function generateGermanPhoneNumber() {
  const prefixes = ['+49', '0049', '0']
  const areaCodes = ['15', '16', '17', '30', '40', '69', '89', '201', '211']

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)]

  const generateDigits = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
  }

  const numberLength = areaCode?.length === 2 ? 8 : 7
  const number = generateDigits(numberLength)

  return `${prefix}${areaCode}${number}`
}
