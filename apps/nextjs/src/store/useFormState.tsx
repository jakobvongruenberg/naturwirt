import type { ReactNode } from 'react'
import type { UseFormProps } from 'react-hook-form'
import type { ZodType } from 'zod'
import { useFormContext } from 'react-hook-form'

import { Form, useForm } from '@farmers/ui/form'
import {
  MeasureCreateFormSchema,
  MeasureInsertSchema,
} from '@farmers/validators'

// Create a factory so that we don't have to worry about using the wrong form types
export const ShadCNFormFactory = <T extends ZodType>(schema: T) => {
  const SchemaFormProvider = (params: {
    children: ReactNode
    formProps: Omit<UseFormProps<T['_input']>, 'resolver'>
  }) => {
    const form = useForm({
      ...params.formProps,
      schema,
    })
    return <Form {...form}>{params.children}</Form>
  }

  const useSchemaFormContext = () => {
    return useFormContext<T['_input']>()
  }
  return { SchemaFormProvider, useSchemaFormContext }
}

export const {
  SchemaFormProvider: MeasureFormProvider,
  useSchemaFormContext: useMeasureFormContext,
} = ShadCNFormFactory(MeasureInsertSchema)

export const {
  SchemaFormProvider: MeasureCreateFormProvider,
  useSchemaFormContext: useMeasureCreateFormContext,
} = ShadCNFormFactory(MeasureCreateFormSchema)
