import { InMemoryHandlerLocator } from '../handler-locator/in-memory-handler-locator'
import { Bus, generateId, Message, MessageDefinition } from '../bus'

export interface SimpleBus {
  dispatch: <T, R>(message: Message<T>) => Promise<R>
  addHandler: <T, R>(name: string, handler: (command: T) => Promise<R>) => MessageDefinition<T>
}

export const createBus = (): SimpleBus => {
  const handlerLocator = new InMemoryHandlerLocator()
  const bus = new Bus(handlerLocator)

  return {
    dispatch: async <T>(message: Message<T>) => await bus.dispatch(message),
    addHandler: <T, R>(name: string, handler: (command: T) => Promise<R>) => {
      const messageDefinition: MessageDefinition<T> = {
        name,
        with<T>(payload: T): Message<T> {
          return {
            id: generateId(),
            name,
            payload
          }
        }
      }
      handlerLocator.addHandler(messageDefinition, handler)
      return messageDefinition
    }
  }
}
