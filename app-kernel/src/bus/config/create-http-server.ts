import { BeforeStartTag, BeforeStopTag } from '../../life-cycle'
import { MessageHandlerDef } from './bus'
import { Container, Definition } from '../../di/container'
import { HttpServer } from '../middleware/transport/http-transport-server'

export default function createHttpServer (
  port: number,
  host: string = '0.0.0.0'
): Definition<any> {
  const factory = (container: Container): object => {
    const server = new HttpServer(
      host,
      port,
      container.get(MessageHandlerDef)
    )

    return {
      server,
      async onBeforeStart () {
        return await server.start()
      },
      async onBeforeStop () {
        return await server.stop()
      }
    }
  }

  return {
    name: 'message-http-server',
    factory,
    tags: [BeforeStartTag, BeforeStopTag]
  }
}
