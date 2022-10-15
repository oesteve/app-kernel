import { Message, Middleware } from '../../bus'

export interface Client {
  send: (message: Message<any>) => Promise<any>
}

export interface Route {
  send: (message: Message<any>) => Promise<any>
  supports: (message: Message<any>) => Boolean
}

export class TransportMiddleware implements Middleware {
  constructor (
    private readonly routes: Route[]
  ) {
  }

  async execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R> {
    const route = this.routes.find(route => route.supports(message))

    if (route != null) {
      return await route.send(message)
    }

    return await next(message)
  }
}
