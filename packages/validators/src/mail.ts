import { z } from '@farmers/shared/common/zod'

export const SendResetPasswordMailSchema = z.object({
  resetLink: z.string().url(),
})
