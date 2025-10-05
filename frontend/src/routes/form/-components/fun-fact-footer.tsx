import { useQuery } from '@tanstack/react-query'

interface FunFactResponse {
  fact: string
}

export function FunFactFooter() {
  async function fetchFunFact() {
    let data = ''
    const response = await fetch('http://localhost:3000/api/fun-facts'
      
    if (!response.ok) {
      throw new Error('Failed to fetch fun fact')
    }
    return response.json()
  }

  return <div className="text-xl font-semibold text-black">{data.fact}</div>
}
