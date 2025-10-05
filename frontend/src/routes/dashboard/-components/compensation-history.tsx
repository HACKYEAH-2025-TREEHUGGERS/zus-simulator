import { Text } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { MoveHorizontal, Plus } from 'lucide-react'
import { useState } from 'react'
import { NumberInput } from '@/components/number-input'
import { Button } from '@/components/button'
import { Select, SelectItem } from '@/components/select'

export const CompensationHistory = () => {
  const { t } = useTranslation()

  const indexingTypes = [
    {
      id: 'forecasted',
      label: t('dashboard.indexingTypes.forecasted'),
    },
    {
      id: 'real',
      label: t('dashboard.indexingTypes.real'),
    },
  ]

  const [indexingType, setIndexingType] =
    useState<(typeof indexingTypes)[number]['id']>('forecasted')

  return (
    <div className="flex flex-col mt-8">
      <Text className="font-semibold">
        {t('dashboard.compensationHistory')}
      </Text>
      <Text className="text-sm max-w-[250px] m-0">
        {t('dashboard.compensationHistorySubtext')}
      </Text>
      <Text
        className="ml-auto text-warning text-sm font-semibold cursor-pointer"
        role="button"
      >
        {t('common.delete')}
      </Text>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <NumberInput
            value={2001}
            defaultValue={2001}
            label={t('common.year')}
            className="w-1/3"
            placeholder="2005"
          />
          <NumberInput
            value={23}
            defaultValue={23}
            label={t('common.sickDays')}
            className="flex-1"
            placeholder="23"
          />
        </div>
        <NumberInput
          value={2077}
          defaultValue={2077}
          label={t('step2.salaryGross')}
          placeholder={t('common.enterPLN')}
          suffix="PLN"
        />
      </div>

      <div
        role="separator"
        className="w-full my-10 border-t border-black/10 h-px"
      />

      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <NumberInput
            label={t('common.year')}
            className="w-1/3"
            placeholder="2005"
          />
          <NumberInput
            label={t('common.sickDays')}
            className="flex-1"
            placeholder="23"
          />
        </div>
        <NumberInput
          label={t('step2.salaryGross')}
          placeholder={t('common.enterPLN')}
          suffix="PLN"
        />
      </div>

      <div className="flex gap-4 w-full">
        <Button
          className="mt-6 mr-auto text-nowrap !text-black !border-black/10 !px-2"
          variant="secondary"
        >
          <Plus size={16} />
          {t('common.addYear')}
        </Button>
        <Button
          className="mt-6 text-nowrap !text-black !border-black/10 !px-2"
          variant="secondary"
        >
          <MoveHorizontal size={16} />
          {t('common.addRange')}
        </Button>
      </div>

      <div className="flex flex-col">
        <Text className="mt-10 text-base font-semibold">
          {t('dashboard.indexingType')}
        </Text>

        <Text className="mt-2 text-xs font-semibold">
          {t('dashboard.howWeCalculateIndexing')}:
        </Text>
        <Text className="text-xs">{t('dashboard.indexingExplanation')}</Text>

        <Select
          value={indexingType}
          defaultValue={indexingType}
          onChange={(selected) => {
            setIndexingType(selected as (typeof indexingTypes)[number]['id'])
          }}
          placeholder={t('dashboard.indexingType')}
          className="mt-4"
        >
          <SelectItem id="forecasted">
            {t('dashboard.indexingTypes.forecasted')}
          </SelectItem>
          <SelectItem id="real">{t('dashboard.indexingTypes.real')}</SelectItem>
        </Select>
      </div>
    </div>
  )
}
