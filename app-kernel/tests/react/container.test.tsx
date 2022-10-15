import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import * as React from 'react'
import { ReactElement } from 'react'
import {ContainerProvider, useContainer} from "../../src/react/container";
import {Container, createDefinition} from "../../src/di/container";

test('Use container provider', () => {
  const count = jest.fn()

  const Counter = createDefinition<() => void>('fn', () => count)
  const container = new Container([Counter])

  const Button = ({ children }: {children: string}): ReactElement => {
    const container = useContainer()

    const clickPushed = (): void => {
      const count = container.get(Counter)
      count()
    }
    return (
            <button onClick={clickPushed}>{children}</button>
    )
  }

  render(
        <ContainerProvider container={container}>
            <Button>Click Me</Button>
        </ContainerProvider>
  )
  fireEvent.click(screen.getByText(/click me/i))
  expect(count).toHaveBeenCalledTimes(1)
})
