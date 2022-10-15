import { Message, Middleware } from '../bus'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('bus')

export default class LoggerMiddleware implements Middleware {
  async execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R> {
    debug('Message received', message.id)
    return await next(message).then(res => {
      debug('Message processed', message.name, message.id)
      return res
    }).catch(err => {
      debug('Message error', message.name, message.id)
      throw err
    })
  }
}
