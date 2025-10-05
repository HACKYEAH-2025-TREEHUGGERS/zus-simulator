import { useQuery } from '@tanstack/react-query'

interface FunFactResponse {
  fact: string
}

export function FunFactFooter() {
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
      <div className="text-center text-base text-black/80">
        Loading fun fact...
      </div>
    )
  if (error)
    return (
      <div className="text-center text-base text-black/80">
        Failed to load fun fact
      </div>
    )

  return <div className="text-center text-base text-black/80">{data?.fact}</div>
}
