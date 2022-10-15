import { MessageDefinition, Handler, HandlerLocator, Message, HandlerNotFoundError } from '../bus'
import { Container, Definition, DefinitionNotFoundException, DefinitionTag } from '../../di/container'
import { CommandHandler } from '../command/command'
import { QueryHandler } from '../query/query'

export interface BusHandlerTag extends DefinitionTag {
  name: 'command-handler'
  commandName: string
  commandNamespace?: string
}

export function createCommandHandler<T> (
  command: MessageDefinition<T>,
  factory: (container: Container) => CommandHandler<T>,
  handlerTags?: DefinitionTag[]
): Definition<CommandHandler<T>> {
  const tags = [{
    name: 'command-handler',
    commandName: command.name,
    commandNamespace: command.namespace
  }]

  if (handlerTags != null) {
    tags.concat(tags)
  }

  return {
    name: `${command.name}-handler`,
    factory,
    tags
  }
}

export function createQueryHandler<T> (
  command: MessageDefinition<T>,
  factory: (container: Container) => QueryHandler<T, any>,
  handlerTags?: DefinitionTag[]
): Definition<QueryHandler<T, any>> {
  const tags = [{
    name: 'command-handler',
    commandName: command.name,
    commandNamespace: command.namespace
  }]

  if (handlerTags != null) {
    tags.concat(tags)
  }

  return {
    name: `${command.name}-handler`,
    factory,
    tags
  }
}

export class DiHandlerLocator implements HandlerLocator {
  private readonly container: Container
  constructor (container: Container) {
    this.container = container
  }

  handlerFor<T, R> (message: Message<T>): (command: T) => Promise<R> {
    const tag: BusHandlerTag = {
      name: 'command-handler',
      commandName: message.name,
      commandNamespace: message.namespace
    }

    try {
      const handler = this.container.getOneByTag<Handler<T, R>>(tag)
      return async (message) => await handler.handle(message)
    } catch (err) {
      if (err instanceof DefinitionNotFoundException) {
        throw err
      }

      throw HandlerNotFoundError.forMessage(message)
    }
  }
}
