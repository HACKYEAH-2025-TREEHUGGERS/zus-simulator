import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

interface FunFactResponse {
  fact: string
}

export function FunFactFooter() {
  const { t } = useTranslation()
  const { data, isLoading, error } = useQuery<FunFactResponse>({
    queryKey: ['fun-fact'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/fun-facts')
      if (!response.ok) throw new Error('Failed to fetch fun fact')
      return response.json()
    },
  })

  if (isLoading)
    return (
      <div className="flex justify-center items-center" role="loader">
        <svg
          className="animate-spin h-5 w-5 text-primary mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    )
  if (error)
    return (
      <div className="text-center text-base text-black/80">
        {t('step1.funFactError')}
      </div>
    )

  return <div className="text-center text-base text-black/80">{data?.fact}</div>
}
