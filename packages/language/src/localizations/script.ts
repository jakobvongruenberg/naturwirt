/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Run this script by navigating to the packages/language/src/localizations directory and running:
 * tsx script.ts
 * tsx can be installed globally with npm install -g tsx
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function flattenObject(
  obj: Record<string, any>,
  prefix = '',
): Record<string, any> {
  return Object.keys(obj).reduce((acc: Record<string, any>, k: string) => {
    const pre = prefix.length ? prefix + '.' : ''
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k))
    } else {
      acc[pre + k] = obj[k]
    }
    return acc
  }, {})
}

function escapeCSV(str: any): string {
  if (typeof str !== 'string') return String(str)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

// Read and parse the TypeScript files
const enContent = fs.readFileSync(path.join(__dirname, 'en.ts'), 'utf8')
const deContent = fs.readFileSync(path.join(__dirname, 'de.ts'), 'utf8')

// Extract the object from the TypeScript files
const enMatch = enContent.match(/const\s+en\s*=\s*(\{[\s\S]*\})/)
const deMatch = deContent.match(
  /const\s+de\s*:\s*typeof\s+en\s*=\s*(\{[\s\S]*\})/,
)

console.log('enMatch', enMatch)
console.log('deMatch', deMatch)
if (!enMatch) {
  console.error('Failed to extract object from en TypeScript files')
  process.exit(1)
}

if (!deMatch) {
  console.error('Failed to extract object from de TypeScript files')
  process.exit(1)
}

// Parse the extracted objects
const en = eval(`(${enMatch[1]})`)
const de = eval(`(${deMatch[1]})`)

// Flatten the objects
const flatEn = flattenObject(en)
const flatDe = flattenObject(de)

// Prepare CSV content
let csvContent = 'ID,Key,English,German\n'
let id = 1

for (const [key, enValue] of Object.entries(flatEn)) {
  const deValue = flatDe[key] || ''
  csvContent += `${id},${escapeCSV(key)},${escapeCSV(enValue)},${escapeCSV(deValue)}\n`
  id++
}

// Write CSV file
fs.writeFileSync(path.join(__dirname, 'translations.csv'), csvContent, 'utf8')

console.log('CSV file has been written successfully')
