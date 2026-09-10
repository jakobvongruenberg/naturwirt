import { TRPCError } from '@trpc/server'

import { desc, eq, schema } from '@farmers/db'
import { MeasureStatusEnum, users } from '@farmers/db/schema/auth'
import { farm } from '@farmers/db/schema/farm'
import { measure } from '@farmers/db/schema/measure'
import { dayjs } from '@farmers/shared/common/dayjs/index'
import { z } from '@farmers/shared/common/zod'
import { FarmInsertSchema, UserSelectSchema } from '@farmers/validators'

import { adminProcedure, createTRPCRouter, protectedProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  //TODO: Make these admin procedures
  all: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findMany({
      orderBy: desc(schema.users.id),
    })
    return users
  }),
  update: adminProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id, ...values } = input
      return ctx.db.update(schema.users).set(values).where(eq(schema.users, id))
    }),
  delete: adminProcedure
    .input(UserSelectSchema.pick({ id: true }))
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(schema.users).where(eq(schema.users.id, input.id))
    }),

  upsertUserMeasure: protectedProcedure
    .input(
      z.object({
        measureId: z.number(),
        // null removes the status, undefined does nothing
        status: z.enum(MeasureStatusEnum.enumValues).nullish(),
        // null removes the note, undefined does nothing
        privateNotes: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      const [user] = await ctx.db
        .select({
          userMeasures: users.userMeasures,
        })
        .from(users)
        .where(eq(users.id, userId))

      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      // Use this technique to avoid overwriting with undefineds
      const thisUserMeasure =
        user.userMeasures?.[input.measureId.toString()] ?? {}
      if (input.status !== undefined) {
        thisUserMeasure.status = input.status
      }
      if (input.status === 'active') {
        thisUserMeasure.dateStartedYYYY_MM_DD = dayjs().format('YYYY-MM-DD')
      }
      if (input.privateNotes !== undefined) {
        thisUserMeasure.privateNotes = input.privateNotes
      }

      await ctx.db
        .update(users)
        .set({
          userMeasures: {
            ...user.userMeasures,
            [input.measureId.toString()]: thisUserMeasure,
          },
        })
        .where(eq(users.id, userId))

      return { success: true }
    }),
  upsertFarm: protectedProcedure
    .input(FarmInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const [existingFarm] = input.id
        ? await ctx.db.select().from(farm).where(eq(farm.id, input.id))
        : []

      if (existingFarm && existingFarm.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Farm does not belong to user',
        })
      }

      await ctx.db
        .insert(farm)
        .values({ ...input, userId: ctx.session.user.id })
        .onConflictDoUpdate({
          set: input,
          target: farm.id,
        })

      return { success: true }
    }),
  getSelf: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id

    const [self] = await ctx.db.select().from(users).where(eq(users.id, userId))

    if (!self) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
    }

    const farms = await ctx.db
      .select()
      .from(farm)
      .where(eq(farm.userId, userId))

    const selfWithFarms = { ...self, farms }

    return selfWithFarms
  }),
  getOwnFarm: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      const [farmResult] = await ctx.db
        .select()
        .from(farm)
        .where(eq(farm.id, input.id))

      if (!farmResult || farmResult.userId !== userId) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Farm not found' })
      }

      return farmResult
    }),
  updateSelf: protectedProcedure
    .input(
      z
        .object({ notificationsEnabled: z.boolean(), name: z.string() })
        .partial(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      await ctx.db
        .update(users)
        .set({
          notificationsEnabled: input.notificationsEnabled,
          name: input.name,
        })
        .where(eq(users.id, userId))

      return { success: true }
    }),
  deleteSelf: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id

    await ctx.db.delete(users).where(eq(users.id, userId))

    return { success: true }
  }),
  deleteFarm: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const farmId = input.id

      await ctx.db.delete(farm).where(eq(farm.id, farmId))

      return { success: true }
    }),
  getUserMeasures: protectedProcedure.query(async ({ ctx }) => {
    const allMeasures = await ctx.db.select().from(measure)

    const [user] = await ctx.db
      .select({
        userMeasures: users.userMeasures,
      })
      .from(users)
      .where(eq(users.id, ctx.session.user.id))

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
    }

    const userMeasures = allMeasures.map((measure) => ({
      ...measure,
      ...user.userMeasures?.[measure.id],
    }))

    return { userMeasures }
  }),
})
