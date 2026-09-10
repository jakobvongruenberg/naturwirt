import { TRPCError } from '@trpc/server'

import { desc, eq, inArray, schema } from '@farmers/db'
import { z } from '@farmers/shared/common/zod'
import { MeasureInsertSchema } from '@farmers/validators'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const measureRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.measure.findMany({
      orderBy: desc(schema.measure.id),
    })
  }),
  publishedView: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.measure.findMany({
      where: eq(schema.measure.isPublished, true),
      orderBy: desc(schema.measure.id),
    })
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.measure.findFirst({
        where: eq(schema.measure.id, input.id),
      })
    }),
  byMeasureIdentifier: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.measure.findFirst({
        where: eq(schema.measure.measureIdentifier, input.id),
      })
    }),
  byMeasureIdentifierList: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(({ input, ctx }) => {
      if (input.ids.length === 0) {
        return []
      }
      return ctx.db.query.measure.findMany({
        where: inArray(schema.measure.measureIdentifier, input.ids),
      })
    }),
  upsert: publicProcedure
    .input(MeasureInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insert(schema.measure)
        .values({ ...input })
        .onConflictDoUpdate({
          set: { ...input },
          target: schema.measure.id,
        })
    }),
  update: publicProcedure
    .input(MeasureInsertSchema)
    .mutation(({ ctx, input }) => {
      const { id, ...values } = input
      if (!id) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'id is required' })
      }
      return ctx.db
        .update(schema.measure)
        .set(values)
        .where(eq(schema.measure.id, id))
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(schema.measure)
        .where(eq(schema.measure.id, input.id))
    }),
})
