import * as command from './command/command'
import * as query from './query/query'
import { Message, MessageHandler } from './bus'

export class CommandQueryHandler implements MessageHandler {
  constructor (
    private readonly commandBus: command.CommandBus,
    private readonly queryBus: query.QueryBus
  ) {
  }

  async handle<T>(message: Message<T>): Promise<any> {
    switch (message.type) {
      case query.TYPE:
        return await this.queryBus.query(message as query.Query<any, any>)
      case command.TYPE:
        return await this.commandBus.dispatch(message as command.Command<any>)
      default:
        throw new Error(`Unsupported message type: ${message.type ?? 'undefined'}`)
    }
  }
}
