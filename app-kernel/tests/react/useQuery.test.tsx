import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { ReactElement } from 'react'
import { act, renderHook } from '@testing-library/react'
import {createQuery, QueryHandler} from "../../src/bus/query/query";
import {createQueryHandler} from "../../src/bus/handler-locator/di-handler-locator";
import {ContainerProvider} from "../../src/react/container";
import {useQuery} from "../../src/react/query";
import Index from "../../src";

test('use query in a component', async () => {
  const GetGreetings = createQuery<string, string>('get-greetings')
  const handler: QueryHandler<string, string> = {
    async handle (name: string): Promise<string> {
      return `Hello ${name}!`
    }
  }

  const app = new Index([
    createQueryHandler(GetGreetings, () => handler)
  ])

  const wrapper = ({ children }: { children: ReactElement }): ReactElement => <ContainerProvider
        container={app.container}>{children}</ContainerProvider>

  const { result } = renderHook(() => useQuery(GetGreetings), { wrapper })

  await act(async () => {
    await result.current.query('Oscar')
  })

  expect(result.current.data).toEqual('Hello Oscar!')
  expect(result.current.loading).toBeFalsy()
  expect(result.current.error).toBeNull()
})
