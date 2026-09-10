import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { vercel } from '@farmers/shared/common/constants'

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string().min(1)
        : z.string().min(1).optional(),
    DATABASE_URL: z
      .string()
      .min(1)
      .transform((val) => {
        if (vercel && vercel.isPreviewDeployment && vercel.gitCommitRef) {
          console.log(
            'Overriding DATABASE_URL with vercel.databaseUrl',
            vercel.databaseUrl,
          )
          return vercel.databaseUrl
        } else {
          return val
        }
      }),
    EMAIL_SERVER: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    VERCEL_URL: z.string().optional(),
    PORT: z.string().optional(),
    EMAIL_ADMIN_DESTINATIONS: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_URL: z
      .string()
      .min(1)
      .transform((val) => {
        if (vercel?.isPreviewDeployment && vercel.gitBranchUrl) {
          console.log(
            'Overriding NEXT_PUBLIC_URL with vercel.gitBranchUrl',
            `https://${vercel.gitBranchUrl}`,
          )
          return `https://${vercel.gitBranchUrl}`
        }
        return val
      }),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
