'use client'

import type { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { SendResetEmailSchema } from '@farmers/validators/auth'
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { Button } from '@farmers/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'
import { toast } from '@farmers/ui/toast'
import { SendResetEmailZodObject } from '@farmers/validators/auth'

import { api } from '~/trpc/react'

export default function ForgotPasswordPage() {
  const [linkSent, setLinkSent] = useState(false)
  const { mutateAsync: sendForgotPasswordEmail } =
    api.auth.sendForgotPasswordEmail.useMutation()

  const form = useForm<SendResetEmailSchema>({
    resolver: zodResolver(SendResetEmailZodObject),
    defaultValues: { email: '' },
  })

  const onSubmit: SubmitHandler<SendResetEmailSchema> = async (data) => {
    try {
      const response = await sendForgotPasswordEmail(data)
      if (response.success) {
        setLinkSent(true)
        toast.success(t('ForgotPassword.Toast.Success'))
      } else {
        toast.error(t('ForgotPassword.Toast.Error'))
      }
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error
          ? error.message
          : t('ForgotPassword.Toast.Error'),
      )
    }
  }

  return (
    <>
      <h2 className='mb-4 text-center text-2xl font-bold text-gray-900 lg:text-3xl'>
        {t('ForgotPassword.Label.Title')}
      </h2>
      <p className='mb-6 text-center text-sm text-gray-600'>
        {t('ForgotPassword.Label.Body')}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('ForgotPassword.Label.EmailAddress')}</FormLabel>
                <FormControl>
                  <Input {...field} type='email' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full'
            disabled={form.formState.isSubmitting || linkSent}
          >
            {form.formState.isSubmitting
              ? 'Senden...'
              : 'Link zum Zurücksetzen senden'}
          </Button>
        </form>
        {linkSent && (
          <p className='mt-4 text-sm text-green-600'>
            {t('ForgotPassword.Label.Success')}
          </p>
        )}
        <div className='mt-4 text-center'>
          <Link
            href={routes.auth.resetPassword}
            className='text-sm text-blue-600 hover:text-blue-500'
          >
            {t('ForgotPassword.Button.SignIn')}
          </Link>
        </div>
      </Form>
    </>
  )
}
