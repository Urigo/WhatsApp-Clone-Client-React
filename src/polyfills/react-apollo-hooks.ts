import { DocumentNode, GraphQLError } from 'graphql'
import { OperationVariables, FetchPolicy } from 'apollo-client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import * as isEqual from 'react-fast-compare'

export type SubscriptionOptions<TVariables> = {
  variables?: TVariables;
  fetchPolicy?: FetchPolicy;
}

export const useSubscription = <T, TVariables = OperationVariables>(
  query: DocumentNode,
  options: SubscriptionOptions<TVariables> = {},
): {
  data: T | { [key: string]: void },
  error?: GraphQLError,
  loading: boolean,
} => {
  const prevOptions = useRef<typeof options | null>(null)
  const client = useApolloClient()
  const [data, setData] = useState<T | {}>({})
  const [error, setError] = useState<GraphQLError | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    prevOptions.current = options
    const subscription = client.subscribe<{ data: T }, TVariables>({
      ...options, query
    })
    .subscribe({
      next: ({ data }) => {
        setData(data)
      },
      error: (err) => {
        setError(err)
        setLoading(false)
      },
      complete: () => {
        setLoading(false)
      },
    })

    return () => {
      subscription.unsubscribe()
    }
  },
  [
    query,
    isEqual(prevOptions.current, options) ? prevOptions.current : options,
  ])

  return useMemo(() => ({
    data, error, loading,
  }),
  [
    data, error, loading,
  ])
}
