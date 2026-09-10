import { createEnv } from '@t3-oss/env-nextjs'

import { vercel } from '@farmers/shared/common/constants'
import { z } from '@farmers/shared/common/zod'

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().transform((val) => {
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
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CHANNEL: z.enum([
      'local',
      'ci',
      'branch',
      'dev',
      'staging',
      'prod',
    ]),
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
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CHANNEL: process.env.NEXT_PUBLIC_CHANNEL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'lint',
})
