'use client'

import { useRouter } from 'next/navigation'
import isNumber from 'lodash/isNumber'
import { useWatch } from 'react-hook-form'

import type { Surcharge } from '@farmers/db/schema/measure'
import type { PartialBy } from '@farmers/shared/common/types'
import type {
  MeasureCreateFormSchemaType,
  MeasureInsertSchemaType,
} from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { dayjs } from '@farmers/shared/common/dayjs/index'
import { Button } from '@farmers/ui/button'
import { Form, useForm } from '@farmers/ui/form'
import { toast } from '@farmers/ui/toast'
import { MeasureCreateFormSchema } from '@farmers/validators'

import type { TRPCTypedError } from '~/utils/types'
import Typography from '~/app/_components/typography'
import ApplicationDate from '~/app/admin/measures/components/application-date'
import ApplicationSteps from '~/app/admin/measures/components/application-steps'
import AreaDetermination from '~/app/admin/measures/components/area-determination'
import {
  AvailableKreis,
  AvailableLand,
} from '~/app/admin/measures/components/available-area'
import Combinations from '~/app/admin/measures/components/combinations'
import CultivationConditions from '~/app/admin/measures/components/cultivation-conditions'
import Duration from '~/app/admin/measures/components/duration'
import Effort from '~/app/admin/measures/components/effort'
import Fertilizer from '~/app/admin/measures/components/fertilizer'
import KeyBenefits from '~/app/admin/measures/components/key-benefits'
import KeyDates from '~/app/admin/measures/components/key-dates'
import MeasureIdentifer from '~/app/admin/measures/components/measure-identifer'
import PlantProtectionMeasures from '~/app/admin/measures/components/plant-protection-measures'
import ProgramTitle from '~/app/admin/measures/components/program-title'
import ProviderEmail from '~/app/admin/measures/components/provider-email'
import ProviderPhoneNumber from '~/app/admin/measures/components/provider-phone-number'
import PublicationDate from '~/app/admin/measures/components/publication-date'
import PublicationSource from '~/app/admin/measures/components/publication-source'
import PublishView from '~/app/admin/measures/components/publish-view'
import Renewable from '~/app/admin/measures/components/renewable'
import Setting from '~/app/admin/measures/components/setting'
import Situation from '~/app/admin/measures/components/situation'
import SubsidyValue from '~/app/admin/measures/components/subsidy-value'
import TitleLong from '~/app/admin/measures/components/title-long'
import TitleShort from '~/app/admin/measures/components/title-short'
import WhatsInvolved from '~/app/admin/measures/components/whats-involved'
import { api } from '~/trpc/react'
import { formDevValues } from '~/utils/seed'

interface DataType {
  name: string
  description: string
  value: string
}

function transformData(
  data: DataType[] | undefined = [],
  type: 'conventional' | 'organic' | 'default',
): Surcharge[] {
  return data.map((item) => ({
    name: item.name,
    description: item.description,
    value: Number(item.value),
    type: type,
  }))
}

const UpsertMeasure = ({
  measure,
}: {
  measure?: MeasureCreateFormSchemaType
}) => {
  const { mutateAsync: upsertMeasure } = api.measure.upsert.useMutation({
    onSuccess: (data) => {
      console.log('onSuccess', data)
    },
    onError: (error) => {
      console.log('onError')
      if (error instanceof Error) {
        const trpcError = error as TRPCTypedError
        console.log('error message', trpcError.message)
      } else {
        console.log('error', error)
      }
    },
  })
  const router = useRouter()
  const hasMultipleValues =
    !!measure?.subsidyValueConventional && !!measure?.subsidyValueOrganic
      ? true
      : false
  const hasOneValue = !hasMultipleValues
  const form = useForm({
    schema: MeasureCreateFormSchema.partial({
      subsidyValue: true,
    }).omit({
      totalAmount: true,
    }),
    defaultValues: {
      ...measure,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- need 0 to be undefined for form validation
      subsidyValueConventional: measure?.subsidyValueConventional || undefined,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- need 0 to be undefined for form validation
      subsidyValueOrganic: measure?.subsidyValueOrganic || undefined,
      subsidyValueTemp: {
        hasOneValue,
        hasMultipleValues,
        addConventionalSurcharges: measure?.surcharges?.some(
          (s) => s.type === 'conventional',
        ),
        addOrganicSurcharges: measure?.surcharges?.some(
          (s) => s.type === 'organic',
        ),
        surchargesConventional: measure?.surcharges
          ?.filter((s) => s.type === 'conventional')
          .map((s) => ({
            ...s,
            value: s.value.toString(),
          })),
        surchargesOrganic: measure?.surcharges
          ?.filter((s) => s.type === 'organic')
          .map((s) => ({
            ...s,
            value: s.value.toString(),
          })),
        surchargesDefault: measure?.surcharges
          ?.filter((s) => s.type === 'default')
          .map((s) => ({
            ...s,
            value: s.value.toString(),
          })),
        derivedSubsidyValue:
          measure?.subsidyValue ??
          measure?.subsidyValueConventional ??
          measure?.subsidyValueOrganic ??
          (undefined as unknown as number),
      },
    },
  })

  function onSubmit(
    values: PartialBy<
      Omit<MeasureCreateFormSchemaType, 'totalAmount'>,
      'subsidyValue'
    >,
  ) {
    const formValues = form.getValues()
    const subsidyValue = formValues.subsidyValueTemp.hasOneValue
      ? (values.subsidyValue ?? 0)
      : null
    const subsidyValueConventional = formValues.subsidyValueTemp
      .hasMultipleValues
      ? values.subsidyValueConventional
      : null
    const subsidyValueOrganic = formValues.subsidyValueTemp.hasMultipleValues
      ? values.subsidyValueOrganic
      : null
    // TODO: Fix this
    const cleanedValues: MeasureInsertSchemaType = {
      ...values,
      subsidyValue,
      subsidyValueConventional,
      subsidyValueOrganic,
      dateUpdated: dayjs().toDate(),
      surcharges: [
        ...transformData(
          formValues.subsidyValueTemp.surchargesDefault,
          'default',
        ),
        ...(formValues.subsidyValueTemp.addConventionalSurcharges
          ? transformData(
              formValues.subsidyValueTemp.surchargesConventional,
              'conventional',
            )
          : []),
        ...(formValues.subsidyValueTemp.hasMultipleValues &&
        formValues.subsidyValueTemp.addOrganicSurcharges
          ? transformData(
              formValues.subsidyValueTemp.surchargesOrganic,
              'organic',
            )
          : []),
      ],
      availableCombination: formValues.combinations
        ? formValues.combinationTemp?.combinationItems?.join(', ')
        : undefined,
      totalAmount:
        (subsidyValue ?? 0) +
        (subsidyValueConventional ?? 0) +
        (subsidyValueOrganic ?? 0),

      ...(formValues.providerEmail && formValues.providerPhoneNumber
        ? {
            contacts: [
              {
                // TODO: Where does the name come from?
                name: '',
                email: formValues.providerEmail,
                phone: formValues.providerPhoneNumber,
              },
            ],
          }
        : {}),
    }
    void upsertMeasure(cleanedValues)
      .then((data) => {
        console.log('data', data)
        toast.success(
          isNumber(formValues.id)
            ? t('Measure.Toast.UpdateSuccess')
            : t('Measure.Toast.CreationSuccess'),
        )
        router.push(routes.admin.measures)
        router.refresh()
      })
      .catch((error) => {
        console.log('error', error)
        if (error instanceof Error) {
          if (
            error.message.includes('farmers_measure_measure_identifier_unique')
          ) {
            toast.error(t('Measure.Toast.AlreadyExists'))
          } else {
            displayError(error)
          }
        } else {
          toast.error(t('Measure.Toast.CreationError'))
        }
      })
  }

  const displayError = (error: Error) => {
    try {
      const message = JSON.parse(error.message) as [{ message: string }]
      toast.error(message[0].message)
    } catch (e) {
      toast.error(t('Measure.Toast.CreationError'))
    }
  }

  const setDevValues = () => {
    form.reset(formDevValues())
  }

  const title = useWatch({ control: form.control, name: 'measureTitleLong' })
  const isPublished = useWatch({ control: form.control, name: 'isPublished' })

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          console.log('values', form.getValues())
          console.log('errors', form.formState.errors)
          void form.handleSubmit(
            (d) => {
              onSubmit(d)
            },
            (err) => {
              toast.error(t('Measure.Toast.FormSubmissionError'))
              console.error(err)
            },
          )(e)
        }}
      >
        {/* z-10 needed to keep above the location selector */}
        <div className='sticky top-0 z-10 grid grid-cols-2 bg-[#D9D9D9] p-4'>
          {/* Need empty div to center */}
          <div className='flex items-center justify-center text-2xl leading-6'>
            {title ?? t('Measure.Label.NoTitle')}
          </div>
          <div className='flex items-center justify-end space-x-4 px-7'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setDevValues()}
            >
              {t('Measure.Button.SetDevValues')}{' '}
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                toast.message(t('Measure.Toast.Cancelled'))
                router.push(routes.admin.measures)
              }}
            >
              {t('Measure.Button.Cancel')}
            </Button>
            <Button variant='primary' type='submit'>
              {isPublished
                ? t('Measure.Button.Publish')
                : t('Measure.Button.SaveDraft')}
            </Button>
          </div>
        </div>
        <div className='container max-w-screen-lg p-0 pb-10 font-normal'>
          <Typography type='h1' className='mb-2 mt-8'>
            {t('Measure.Label.CreateNewMeasure')}
          </Typography>
          <div className='divide-y'>
            <PublishView />
            <MeasureIdentifer />
            <TitleLong />
            <TitleShort />
            <ProgramTitle />
            <PublicationDate />
            <PublicationSource />
            <ApplicationDate />
            <AvailableLand />
            <AvailableKreis />
            <SubsidyValue />
            <ProviderEmail />
            <ProviderPhoneNumber />
            <Effort />
            <Renewable />
            <Duration />
            <Setting />
            <Situation />
            <WhatsInvolved />
            <CultivationConditions />
            <PlantProtectionMeasures />
            <Fertilizer />
            <KeyBenefits />
            <KeyDates />
            <AreaDetermination />
            <Combinations />
            <ApplicationSteps />
          </div>
          <Button variant='primary' type='submit' className='mb-14 w-full'>
            {isPublished
              ? t('Measure.Button.Publish')
              : t('Measure.Button.SaveDraft')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpsertMeasure

const _error = {
  subsidyValue: {
    message: 'Required',
    type: 'invalid_type',
  },
  subsidyValueConventional: {
    message: 'Expected number, received string',
    type: 'invalid_type',
    ref: {},
  },
  subsidyValueOrganic: {
    message: 'Expected number, received string',
    type: 'invalid_type',
    ref: {},
  },
  cultivationConditions: [
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
  ],
  plantProtectionMeasures: [
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
  ],
  fertilizer: [
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
  ],
  keyBenefits: [
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
    {
      message: 'Expected array, received string',
      type: 'invalid_type',
      ref: {},
    },
  ],
  keyDates: [
    {
      keydate: {
        message: 'Required',
        type: 'invalid_type',
      },
    },
    {
      keydate: {
        message: 'Required',
        type: 'invalid_type',
      },
    },
  ],
  areaOptimization: {
    root: {
      message: 'Expected array, received object',
      type: 'invalid_type',
    },
  },
}
