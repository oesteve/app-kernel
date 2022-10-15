import { useCallback, useState } from 'react'
import { QueryBus, QueryDefinition } from '../bus/query/query'
import { useContainer } from './container'

interface UseQueryProps<T, R> {
  data: R | undefined
  loading: boolean
  error: Error | null
  query: (payload: T) => void
}

export const useQuery = <T, R>(queryDefinition: QueryDefinition<T, R>): UseQueryProps<T, R> => {
  const container = useContainer()

  const queryBus = container.getOneByTagName<QueryBus>('query-bus')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<R>()

  const callback = (payload: T): void => {
    setLoading(true)
    queryBus.query(queryDefinition.with(payload))
      .then((res) => setData(res))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }

  const query = useCallback(callback, [])

  return {
    data,
    loading,
    error,
    query
  }
}
