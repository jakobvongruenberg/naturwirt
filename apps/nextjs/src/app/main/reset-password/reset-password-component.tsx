'use client'

import type { SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { t } from 'i18next'
import { Loader } from 'lucide-react'

import type { ResetPasswordFormSchema } from '@farmers/validators/auth'
import { PASSWORD_ERROR_MESSAGES } from '@farmers/shared/common/constants'
import { Button } from '@farmers/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@farmers/ui/form'
import { Input } from '@farmers/ui/input'
import { SpinnerFullPage } from '@farmers/ui/spinner'
import { ResetPasswordZodObject } from '@farmers/validators/auth'

import { api } from '~/trpc/react'

export const ResetPasswordComponent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams?.get('token')

  const { data: verifyToken, isLoading } = api.auth.verifyToken.useQuery(
    {
      token: token ?? '',
    },
    { enabled: !!token },
  )

  const { mutateAsync: resetPassword } = api.auth.resetPassword.useMutation()

  const form = useForm({
    schema: ResetPasswordZodObject,
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (verifyToken?.success) {
      router.refresh()
    }
  }, [router, verifyToken])

  const isFormLoading = form.formState.isSubmitting
  const newPassword = form.watch('newPassword')

  const onSubmit: SubmitHandler<ResetPasswordFormSchema> = async (data) => {
    try {
      const response = await resetPassword({
        token: token ?? '',
        password: data.confirmPassword,
      })

      if (response.success) {
        router.push('reset-password/success')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const renderValidationMessages = () => {
    const validations = [
      {
        key: 'length',
        isValid: newPassword?.length >= 8,
        message: PASSWORD_ERROR_MESSAGES.length,
      },
      {
        key: 'number',
        isValid: /\d/.test(newPassword || ''),
        message: PASSWORD_ERROR_MESSAGES.number,
      },
      {
        key: 'upper_case',
        isValid: /[A-Z]/.test(newPassword || ''),
        message: PASSWORD_ERROR_MESSAGES.upper_case,
      },
      {
        key: 'lower_case',
        isValid: /[a-z]/.test(newPassword || ''),
        message: PASSWORD_ERROR_MESSAGES.lower_case,
      },
    ]

    return (
      <ul className='list-inside list-disc'>
        {validations.map(({ key, isValid, message }) => (
          <li
            key={key}
            className={
              isValid || isFormLoading ? 'text-green-500' : 'text-red-500'
            }
          >
            {message}
          </li>
        ))}
      </ul>
    )
  }

  return isLoading ? (
    <div className='flex h-full w-full items-center justify-center'>
      <SpinnerFullPage />
    </div>
  ) : verifyToken?.success ? (
    <div className='flex h-screen min-h-screen w-full flex-col'>
      <div className='flex h-full w-full flex-col justify-center self-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='min-w-[300px] space-y-6 self-center'
          >
            <FormField
              disabled={isFormLoading}
              control={form.control}
              name='newPassword'
              render={({ field }) => {
                return (
                  <FormItem className='h-max w-full'>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('AuthModal.Label.Password')}
                        {...field}
                        type='password'
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormField
              disabled={isFormLoading}
              control={form.control}
              name='confirmPassword'
              render={({ field }) => {
                return (
                  <FormItem className='h-max w-full'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          placeholder={t('AuthModal.Label.Password')}
                          {...field}
                          type='password'
                        />
                        <FormMessage />
                      </>
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <div className='flex flex-col gap-4'>
              <Button className='flex w-full flex-row items-center gap-4'>
                {isFormLoading && <Loader className='animate-spin' />} Confirm
              </Button>
              {renderValidationMessages()}
            </div>
          </form>
        </Form>
      </div>
    </div>
  ) : null
}
