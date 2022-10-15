import '@testing-library/jest-dom/extend-expect'
import * as React from 'react'

import { ReactElement } from 'react'
import { act, renderHook } from '@testing-library/react'
import {CommandHandler, createCommand} from "../../src/bus/command/command";
import {createCommandHandler} from "../../src/bus/handler-locator/di-handler-locator";
import {ContainerProvider} from "../../src/react/container";
import {useCommand} from "../../src/react/command";
import Index from "../../src";

test('use command in a component', async () => {
  const count = jest.fn()

  const Increment = createCommand('increment')
  const handler: CommandHandler<any> = {
    async handle (command: any): Promise<void> {
      count()
      return await Promise.resolve()
    }
  }

  const app = new Index([
    createCommandHandler(Increment, () => handler)
  ])

  const wrapper = ({ children }: { children: ReactElement }): ReactElement => <ContainerProvider
        container={app.container}>{children}</ContainerProvider>
  const { result } = renderHook(() => useCommand(Increment), { wrapper })

  await act(async () => {
    await result.current.dispatch()
  })

  expect(result.current.error).toBeNull()
  expect(count).toHaveBeenCalledTimes(1)
})
