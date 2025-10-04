import { useTranslation } from 'react-i18next'
import { Text } from 'react-aria-components'
import { useRetirementForm } from './-components/retirement-form-provider'
import { TextInput } from '@/components/text-input'

export function Step1() {
  const form = useRetirementForm()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-xl font-semibold text-black">
        {t('step1.enterBasicInfo')}
      </Text>
      <Text className="text-xl text-darkBlue">
        {t('step1.checkExpectations')}
      </Text>

      <TextInput label={t('step1.retirementQuestion')} />
    </div>
  )
}
