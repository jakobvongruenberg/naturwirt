import { t } from '@farmers/language/i18next'
import { z } from '@farmers/shared/common/zod'

export const SendResetEmailZodObject = z.object({
  email: z.string().email(),
})
export const ResetPasswordZodObject = z
  .object({
    newPassword: z.string().min(8).regex(/[0-9]/).regex(/[A-Z]/).regex(/[a-z]/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: t('Validator.Auth.Label.PasswordDontMatch'),
    path: ['confirmPassword'],
  })
export type SendResetEmailSchema = z.infer<typeof SendResetEmailZodObject>
export type ResetPasswordFormSchema = z.infer<typeof ResetPasswordZodObject>
