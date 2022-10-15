export interface Message<T> {
  name: string
  namespace?: any
  payload: T
  id: string
  correlationId?: string
  type?: string
}

export interface Handler<T, R> {
  handle: (command: T) => Promise<R>
}

export interface HandlerLocator {
  handlerFor: <T, R>(message: Message<T>) => (message: T) => Promise<R>
}

export interface Middleware {
  execute: <T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>) => Promise<R>
}

export interface MessageHandler {
  handle: (message: Message<any>) => Promise<any>
}

export interface MessageDefinition<T> {
  with: (payload: T) => Message<T>
  name: string
  namespace?: string
  schema?: object
}

export class ExecutorMiddleware implements Middleware {
  handlers: HandlerLocator

  constructor (handlerLocator: HandlerLocator) {
    this.handlers = handlerLocator
  }

  execute<T>(message: Message<T>, next: (messages: Message<T>) => any): any {
    try {
      const handlerFor = this.handlers.handlerFor(message)
      return handlerFor(message.payload)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export class HandlerNotFoundError extends Error {
  static forMessage (message: Message<any>): HandlerNotFoundError {
    return new HandlerNotFoundError(`Handler form command ${message.name} not found`)
  }
}

export class Bus {
  handlerLocator: HandlerLocator
  executionChain: (message: Message<any>) => Promise<any> = async () => await Promise.resolve(null)

  constructor (handlerLocator: HandlerLocator) {
    this.handlerLocator = handlerLocator

    const executorMiddleware = new ExecutorMiddleware(handlerLocator)
    this.addMiddleware(executorMiddleware)
  }

  addMiddleware (middleware: Middleware): void {
    const chain = this.executionChain
    this.executionChain = async (message: Message<any>) => await middleware.execute(message, chain)
  }

  async dispatch<T, R>(message: Message<T>): Promise<R> {
    return await this.executionChain(message)
  }
}

export const generateId = (): string => `${Math.floor(Math.random() * 10)}`
