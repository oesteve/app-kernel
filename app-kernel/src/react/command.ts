import { useContainer } from './container'
import { useCallback, useState } from 'react'
import { Command, CommandBus, CommandDefinition } from '../bus/command/command'

interface UseCommandProps {
  loading: boolean
  error: Error | null
  dispatch: (command?: Command<any>) => Promise<void>
}

export const useCommand = (messageDef: CommandDefinition<any>): UseCommandProps => {
  const container = useContainer()
  const commandBus = container.getOneByTagName<CommandBus>('command-bus')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const dispatch = useCallback(
    async (payload?: Command<any>) => {
      setLoading(true)
      try {
        await commandBus.dispatch(messageDef.with(payload === undefined ? payload : {}))
      } catch (err) {
        setError(err as Error)
      }
      setLoading(false)
    },
    []
  )

  return {
    loading,
    error,
    dispatch
  }
}
