import { Bus, generateId, Handler, HandlerLocator, Message, MessageDefinition, Middleware } from '../bus'
import { JSONSchemaType } from 'ajv'

export const TYPE = 'query'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Query<T, R> extends Message<T> {
  type: 'query'
}

export interface QueryDefinition<T, R> extends MessageDefinition<T> {
  with: (payload: T) => Query<T, R>
}

export interface QueryHandler<T, R> extends Handler<T, R>{
  handle: (query: T) => Promise<R>
}

export function createQuery<T, R> (name: string, namespace?: string, schema?: JSONSchemaType<T>): QueryDefinition<T, R> {
  const builder = (payload: T): Query<T, R> => ({
    id: generateId(),
    name,
    namespace,
    payload,
    type: TYPE
  })

  return {
    with: builder,
    name,
    namespace,
    schema
  }
}

export class QueryBus {
  private readonly bus: Bus

  constructor (handlerLocator: HandlerLocator, middlewares: Middleware[] = []) {
    this.bus = new Bus(handlerLocator)
    middlewares.forEach(middleware => this.bus.addMiddleware(middleware))
  }

  async query<T, R>(queryMessage: Query<T, R>): Promise<R> {
    return await this.bus.dispatch(queryMessage)
  }
}
