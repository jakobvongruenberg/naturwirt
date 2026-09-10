import fs from 'fs'
import path from 'path'

// Run this script with Node.js to generate a CSV file from a JSON file
// or, Run this with Quokka.js to generate a CSV file
const en: Record<string, unknown> = {
  // ... (The full JSON data goes here)
}

function jsonToCSV(json: Record<string, unknown>): string {
  const header = [
    'Number',
    'TranslationKey',
    'Notes for Context',
    'Last Changed Date',
    'English',
    'German',
  ]
  const rows: (string | number)[][] = []

  let number = 1

  function traverse(obj: Record<string, unknown>, keyPrefix = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentKey = keyPrefix ? `${keyPrefix}.${key}` : key

      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
      ) {
        traverse(value as Record<string, unknown>, currentKey)
      } else if (typeof value === 'string') {
        rows.push([
          number++,
          currentKey,
          '', // Notes for Context
          '8-20-24', // Last Changed Date
          value, // English
          '', // German (can be left empty or filled with appropriate German translation)
        ])
      }
    }
  }

  traverse(json)

  // Convert rows to CSV string
  const csvContent = [header, ...rows].map((e) => e.join(',')).join('\n')

  return csvContent
}

const csvContent = jsonToCSV(en)
const filePath = path.join(__dirname, 'translations.csv')

fs.writeFile(filePath, csvContent, (err) => {
  if (err) {
    console.error('Error writing file', err)
  } else {
    console.log(`CSV file saved to ${filePath}`)
  }
})
