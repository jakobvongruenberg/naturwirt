import { parse } from 'pg-connection-string'
import postgres from 'postgres'

export async function createDatabaseIfNotExists(
  connectionString: string,
): Promise<void> {
  const config = parse(connectionString)
  const dbName = config.database
  if (!dbName) {
    throw new Error('Database name not found in connection string')
  }

  // Remove the database name from the connection string
  const baseConnectionString = connectionString.replace(`/${dbName}`, '')

  // Connect to the default 'postgres' database
  const sql = postgres(baseConnectionString + '/postgres')

  try {
    // Check if the database exists
    const result = await sql`
      SELECT 1 FROM pg_database WHERE datname = ${dbName}
    `

    if (result.length === 0) {
      console.log(`Database ${dbName} does not exist. Creating it now...`)
      // Create the database
      await sql`CREATE DATABASE ${sql(dbName)}`
      console.log(`Database ${dbName} created successfully.`)
    } else {
      console.log(`Database ${dbName} already exists.`)
    }
  } catch (error) {
    console.error('Error creating database:', error)
    throw error
  } finally {
    await sql.end()
  }
}
