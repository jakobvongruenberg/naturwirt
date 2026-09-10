import type { MeasureCreateFormSchemaType } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { safeParseInt } from '@farmers/shared/common/functions'

import UpsertMeasure from '~/app/admin/measures/components/upsert-measure'
import { api } from '~/trpc/server'

const UpsertMeasurePage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const measureData = await api.measure.byId({
    id: safeParseInt(id) ?? -1,
  })
  if (!measureData) {
    return <div>{t('Measure.Label.MeasureNotFound')}</div>
  }
  const measure: MeasureCreateFormSchemaType = {
    ...measureData,
    subsidyValueTemp: {
      derivedSubsidyValue:
        measureData.subsidyValue ??
        measureData.subsidyValueConventional ??
        measureData.subsidyValueOrganic ??
        (undefined as unknown as number),
      addConventionalSurcharges: !!measureData.surcharges?.find(
        (s) => s.type === 'conventional',
      )?.value,
      addOrganicSurcharges: !!measureData.surcharges?.find(
        (s) => s.type === 'organic',
      )?.value,
      hasMultipleValues: !!measureData.surcharges?.length,
      hasOneValue: !measureData.surcharges?.length,
      surchargesConventional:
        measureData.surcharges
          ?.filter((s) => s.type === 'conventional')
          .map((s) => ({ ...s, value: s.value.toString() })) ?? [],
      surchargesOrganic:
        measureData.surcharges
          ?.filter((s) => s.type === 'organic')
          .map((s) => ({ ...s, value: s.value.toString() })) ?? [],
      surchargesDefault:
        measureData.surcharges
          ?.filter((s) => s.type === 'default')
          .map((s) => ({ ...s, value: s.value.toString() })) ?? [],
    },
    applicationSteps: measureData.applicationSteps ?? [],
    applicationStepsTemp: {
      includeDescription: !!measureData.applicationSteps?.length,
    },
    combinationTemp: {
      combinationItems: measureData.availableCombination?.split(', ') ?? [],
    },
    effortTemp: {
      includesToolTip: !!measureData.effort?.length,
    },
    durationTemp: {
      includesToolTip: !!measureData.duration,
    },
    settingTemp: {
      includesToolTip: !!measureData.setting,
    },
    situationTemp: {
      includesToolTip: !!measureData.situation,
    },
  }
  return <UpsertMeasure measure={measure} />
}

export default UpsertMeasurePage
