import { HandlerNotFoundError, HandlerLocator, Message, MessageDefinition } from '../bus'

export class InMemoryHandlerLocator implements HandlerLocator {
  private handlerMap: { [key: string]: (payload: any) => any} = {}

  addHandler<T, R>(commandDefinition: MessageDefinition<T>, handler: (payload: T) => Promise<R>): void {
    this.handlerMap[commandDefinition.name] = handler
  }

  handlerFor (message: Message<any>): (command: any) => any {
    if (this.handlerMap[message.name] === undefined) {
      throw HandlerNotFoundError.forMessage(message)
    }

    return this.handlerMap[message.name]
  }
}
