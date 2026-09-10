import type { DefaultSession } from 'next-auth'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 * Need separate declaration in @farmers/nextjs and @farmers/auth
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user:
      | ({
          id: string
          email?: string
          name?: string
          // ...other properties
          role?: 'admin' | 'user'
          // role: UserRole;
        } & DefaultSession['user'])
      | undefined
  }

  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: 'admin' | 'user'
  }

  interface JWT extends DefaultJWT {
    // ...other properties
    role?: 'admin' | 'user'
    // role: UserRole;
    signinunixsecondsepoch: number
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
  declare module global {
    declare module '*.png' {
      const content: string
      export default content
    }
    declare module '*.svg' {
      const content: string
      export default content
    }
    declare module '*.jpeg' {
      const content: string
      export default content
    }
    declare module '*.jpg' {
      const content: string
      export default content
    }
    declare module '*.webp' {
      const content: string
      export default content
    }
  }
}

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    // Used in the Header component and in csv
    name?: string
    excludeFromCsv?: boolean
  }
}
