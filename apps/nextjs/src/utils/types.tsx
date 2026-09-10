import type { TRPCClientError } from '@trpc/client'

import type { AppRouter } from '@farmers/api'

export type TRPCTypedError = TRPCClientError<AppRouter>
