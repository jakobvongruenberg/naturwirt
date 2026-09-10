import { authRouter } from './router/auth'
import { measureRouter } from './router/measure'
import { pingRouter } from './router/ping'
import { userRouter } from './router/users'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  ping: pingRouter,
  user: userRouter,
  measure: measureRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
