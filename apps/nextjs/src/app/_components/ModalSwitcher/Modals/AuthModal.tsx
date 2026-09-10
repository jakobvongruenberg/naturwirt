'use client'

import type { SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import type { LoginSchemaType, SignupSchemaType } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { Checkbox } from '@farmers/ui/checkbox'
import { Dialog, DialogContent } from '@farmers/ui/dialog'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@farmers/ui/tabs'
import { LoginSchema, SignupSchema } from '@farmers/validators'

import type { Options } from '~/store/modal'
import { signInServerAction } from '~/app/_actions/signin_server_action'
import { signUpServerAction } from '~/app/_actions/signup_server_action'
import {
  default as LoginSubmitButton,
  default as SignupSubmitButton,
} from '~/app/_components/Action/SubmitButton'
import Error from '~/app/_components/Alert/Error'
import { ModalStore } from '~/store/modal'

export default function AuthModal({
  open: defaultOpen,
  options,
}: {
  open: boolean
  options?: Options
}) {
  const [loginErr, setLoginErr] = useState('')
  const [signupErr, setSignupErr] = useState('')
  const loginForm = useForm({
    schema: LoginSchema,
  })
  const signupForm = useForm({
    schema: SignupSchema,
  })

  const handleOnOpenChange = (isOpen: boolean) => {
    loginForm.reset()
    signupForm.reset()
    ModalStore.set('open', isOpen)
  }

  const type = options?.type
  const isSignupLoading = signupForm.formState.isSubmitting
  const isLoginLoading = loginForm.formState.isSubmitting

  const submitSignupHandler: SubmitHandler<SignupSchemaType> = async (data) => {
    setSignupErr('')
    const { error, success } = await signUpServerAction({
      email: data.email,
      password: data.password,
    })
    if (error) setSignupErr(error)

    if (success) {
      ModalStore.set('open', false)
      window.location.reload()
    }
  }

  const submitLoginHandler: SubmitHandler<LoginSchemaType> = async (data) => {
    setLoginErr('')
    const { error, success } = await signInServerAction(data)
    if (error) setLoginErr(error)

    if (success) {
      ModalStore.set('open', false)
      window.location.reload()
    }
  }

  useEffect(() => {
    if (!defaultOpen) {
      setLoginErr('')
      setSignupErr('')
    }
  }, [defaultOpen])

  return (
    <Dialog open={defaultOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent className='max-w-[95vw] p-4 lg:max-w-[556px] lg:p-6 [&>button:focus]:ring-0 [&>button:focus]:ring-offset-0 [&>button>svg]:h-6 [&>button>svg]:w-6'>
        <h3 className='mb-4 text-center text-xl lg:text-[32px]'>
          {t('AuthModal.Label.WelcomeToForderassistent')}
        </h3>
        <Tabs defaultValue={type ?? 'login'} className='w-auto'>
          <TabsList className='mb-4 w-full items-start justify-start gap-4 bg-transparent p-0 text-left lg:mb-[24px] lg:gap-8'>
            <TabsTrigger
              value='signup'
              className={`
              w-auto rounded-none border-0 border-black px-0 pb-2 text-lg font-[600] shadow-none drop-shadow-none
                data-[state=active]:border-b-4 data-[state=inactive]:text-[#A0A0A0] lg:pb-[12px] lg:text-[24px]
              `}
            >
              {t('AuthModal.Button.SignUp')}
            </TabsTrigger>
            <TabsTrigger
              value='login'
              className={`
              w-auto rounded-none border-0 border-black px-0 pb-2 text-lg font-[600] shadow-none drop-shadow-none
                data-[state=active]:border-b-4 data-[state=inactive]:text-[#A0A0A0] lg:pb-[12px] lg:text-[24px]
              `}
            >
              {t('AuthModal.Button.LogIn')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value='signup' className='mt-4 lg:mt-[16px]'>
            {signupErr && (
              <Error message={signupErr} className='mb-4 lg:mb-[16px]' />
            )}
            <Form {...signupForm}>
              <form
                className='flex w-full flex-col gap-4'
                onSubmit={signupForm.handleSubmit(submitSignupHandler)}
              >
                <FormField
                  control={signupForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base lg:text-[18px]'>
                        {t('AuthModal.Label.Email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={`
                          h-auto rounded-[8px] border-2 border-[#DCDCDC] px-3 py-2 text-base shadow-none placeholder:font-[500] placeholder:text-[#A0A0A0] lg:px-[20px] 
                            lg:py-[15px] lg:text-[20px]
                          `}
                          placeholder='name@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base lg:text-[18px]'>
                        {t('AuthModal.Label.Password')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className={`
                          h-auto rounded-[8px] border-2 border-[#DCDCDC] px-3 py-2 text-base shadow-none placeholder:font-[500] placeholder:text-[#A0A0A0] lg:px-[20px] 
                            lg:py-[15px] lg:text-[20px]
                          `}
                          placeholder={t(
                            'AuthModal.Label.CreateAPasswordPlaceholder',
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base lg:text-[18px]'>
                        {t('AuthModal.Label.ConfirmPassword')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className={`
                          h-auto rounded-[8px] border-2 border-[#DCDCDC] px-3 py-2 text-base shadow-none placeholder:font-[500] placeholder:text-[#A0A0A0] lg:px-[20px] 
                            lg:py-[15px] lg:text-[20px]
                          `}
                          placeholder={t(
                            'AuthModal.Label.CreateAPasswordPlaceholder',
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex pt-2 lg:pt-[5px]'>
                  <FormField
                    control={signupForm.control}
                    name='acceptTerms'
                    render={({ field }) => (
                      <FormItem className='flex items-start'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id='terms'
                            className='mr-2 mt-1 h-5 w-5 lg:mr-[16px] lg:h-[24px] lg:w-[24px]'
                          />
                        </FormControl>
                        <label
                          htmlFor='terms'
                          className='text-sm font-[400] leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-[18px] lg:leading-[24px]'
                        >
                          {t('AuthModal.Label.IAgreeToForderassistent')}{' '}
                          <Link
                            href={routes.main.terms}
                            className='font-[600] underline'
                          >
                            {' '}
                            {t('AuthModal.Label.TermsOfUse')}{' '}
                          </Link>
                          {t('AuthModal.Label.And')}{' '}
                          <Link
                            href={routes.main.privacy}
                            className='font-[600] underline'
                          >
                            {t('AuthModal.Label.PrivacyPolicy')}
                          </Link>
                        </label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SignupSubmitButton
                  label={t('AuthModal.Button.SignUp')}
                  loading={isSignupLoading}
                  btnClassName='h-auto rounded-[8px] py-2 lg:py-[13px] text-lg lg:text-[22px] text-white shadow-none hover:bg-black'
                  loaderClassName='h-6 w-6 lg:h-[33px] lg:w-[33px] animate-spin'
                />
              </form>
            </Form>
          </TabsContent>
          <TabsContent value='login' className='mt-4 lg:mt-[16px]'>
            {loginErr && (
              <Error message={loginErr} className='mb-4 lg:mb-[16px]' />
            )}
            <Form {...loginForm}>
              <form
                className='flex w-full flex-col gap-4 lg:gap-6'
                onSubmit={loginForm.handleSubmit(submitLoginHandler)}
              >
                <FormField
                  control={loginForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base lg:text-[18px]'>
                        {t('AuthModal.Label.Email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={`
                          h-auto rounded-[8px] border-2 border-[#DCDCDC] px-3 py-2 text-base shadow-none placeholder:font-[500] placeholder:text-[#A0A0A0] lg:px-[20px] 
                            lg:py-[15px] lg:text-[20px]
                          `}
                          placeholder='name@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base lg:text-[18px]'>
                        {t('AuthModal.Label.Password')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={`
                          h-auto rounded-[8px] border-2 border-[#DCDCDC] px-3 py-2 text-base shadow-none placeholder:font-[500] placeholder:text-[#A0A0A0] lg:px-[20px] 
                            lg:py-[15px] lg:text-[20px]
                          `}
                          placeholder={t('AuthModal.Label.EnterYourPassword')}
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoginSubmitButton
                  label={t('AuthModal.Button.LogIn')}
                  loading={isLoginLoading}
                  btnClassName='h-auto rounded-[8px] py-2 lg:py-[13px] text-lg lg:text-[22px] text-white shadow-none hover:bg-black'
                  loaderClassName='h-6 w-6 lg:h-[33px] lg:w-[33px] animate-spin'
                />
                <Link
                  href={routes.auth.forgotPassword}
                  className='flex items-center justify-center text-center text-lg font-[600] no-underline lg:text-[22px]'
                  onClick={() => {
                    ModalStore.set('open', false)
                  }}
                >
                  {t('AuthModal.Button.ForgotYourPassword')}
                </Link>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
