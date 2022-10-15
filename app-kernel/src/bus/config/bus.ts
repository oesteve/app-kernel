import { Container, createDefinition, Definition, DefinitionTag } from '../../di/container'
import { Message, MessageHandler } from '../bus'
import * as command from '../command/command'
import * as query from '../query/query'
import { Client, Route, TransportMiddleware } from '../middleware/transport/transport-middleware'
import { ValidatorMiddleware } from '../middleware/validation/validator'
import { DiHandlerLocator } from '../handler-locator/di-handler-locator'
import LoggerMiddleware from '../middleware/logger'
import { CommandQueryHandler } from '../command-query-handler'

export const RouteTag: DefinitionTag = {
  name: 'bus-router'
}

export function createMessageRoute (
  name: string,
  supports: (message: Message<any>) => Boolean,
  clientDefinition: Definition<Client>
): Definition<Route> {
  const factory = (container: Container): Route => {
    const client = container.get(clientDefinition)

    return {
      send: async (message: Message<any>) => await client.send(message),
      supports
    }
  }

  return {
    factory,
    name,
    tags: [RouteTag]
  }
}

export const ValidatorMiddlewareDef = createDefinition<ValidatorMiddleware>(
  'validator-middleware',
  (container) => new ValidatorMiddleware(container)
)

export const QueryBusDef = createDefinition<query.QueryBus>(
  'query-bus',
  (container) => {
    const handlerLocator = new DiHandlerLocator(container)
    const middlewares = [
      container.get(ValidatorMiddlewareDef),
      new LoggerMiddleware(),
      new TransportMiddleware(container.getByTag(RouteTag))
    ]

    return new query.QueryBus(handlerLocator, middlewares)
  },
  [{ name: 'query-bus' }]
)

export const CommandBusDef = createDefinition<command.CommandBus>(
  'command-bus',
  (container) => {
    const handlerLocator = new DiHandlerLocator(container)
    const middlewares = [
      container.get(ValidatorMiddlewareDef),
      new LoggerMiddleware(),
      new TransportMiddleware(container.getByTag(RouteTag))
    ]
    return new command.CommandBus(handlerLocator, middlewares)
  },
  [{ name: 'command-bus' }]
)

export const MessageHandlerDef = createDefinition<MessageHandler>(
  'message-handler',
  (container) => {
    return new CommandQueryHandler(
      container.get(CommandBusDef),
      container.get(QueryBusDef)
    )
  }
)
