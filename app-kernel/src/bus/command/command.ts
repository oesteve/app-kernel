import {
  Bus, generateId,
  HandlerLocator,
  Message,
  MessageDefinition,
  Middleware
} from '../bus'

export const TYPE = 'command'

export interface Command<T> extends Message<T>{
  type: 'command'
}

export interface CommandDefinition<T> extends MessageDefinition<T>{
  type: 'command'
  with: (payload: T) => Command<T>
}

export interface CommandHandler<T> {
  handle: (command: T) => Promise<void>
}

export function createCommand<T> (
  name: string,
  namespace?: string | undefined,
  schema?: object
): CommandDefinition<T> {
  const createCommand = (payload: T): Command<T> => ({
    type: TYPE,
    id: generateId(),
    name,
    namespace,
    payload
  })

  return {
    type: TYPE,
    with: createCommand,
    name,
    namespace,
    schema
  }
}

/**
 * Prevent return data
 */
export class CommandMiddleware implements Middleware {
  async execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R> {
    return await next(message).then((res) => {
      if (res !== undefined) {
        throw new Error('Command handler can\'t return data')
      }

      return res
    })
  }
}

export class CommandBus {
  private readonly bus: Bus

  constructor (handlerLocator: HandlerLocator, middlewares: Middleware[] = []) {
    this.bus = new Bus(handlerLocator)
    middlewares = [
      new CommandMiddleware(),
      ...middlewares
    ]

    middlewares.forEach(middleware => this.bus.addMiddleware(middleware))
  }

  async dispatch<T>(queryMessage: Command<T>): Promise<void> {
    return await this.bus.dispatch(queryMessage)
  }
}
