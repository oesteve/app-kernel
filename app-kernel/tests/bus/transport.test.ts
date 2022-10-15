import { HttpServer } from '../../src/bus/middleware/transport/http-transport-server'
import { Route, TransportMiddleware } from '../../src/bus/middleware/transport/transport-middleware'
import {InMemoryHandlerLocator} from "../../src/bus/handler-locator/in-memory-handler-locator";
import {Bus, Message} from "../../src/bus/bus";
import {HttpClient} from "../../src/bus/middleware/transport/http-transport-client";

describe('Send message using a transport', () => {
  let server: HttpServer

  afterEach(async () => {
    await server?.stop()
  })

  test('start server', async () => {
    const port = 8009

    server = new HttpServer('127.0.0.1', port, {
      async handle (command) {
        return { foo: 'bar' }
      }
    })

    await server.start()
  })

  test('Send request', async () => {
    let requestedCommand: Message<any> | null = null

    const port = 8009

    server = new HttpServer('127.0.0.1', port, {
      async handle (command) {
        requestedCommand = command
        return { foo: 'bar' }
      }
    })

    await server.start()

    const client = new HttpClient(`http://127.0.0.1:${port}`)

    const route: Route = {
      send: async (message: Message<any>) => await client.send(message),
      supports: () => true
    }

    const middleware = new TransportMiddleware([route])

    const bus = new Bus(new InMemoryHandlerLocator())
    bus.addMiddleware(middleware)

    const command: Message<string> = {
      id: '',
      name: '',
      payload: '',
      type: 'command'
    }

    await expect(bus.dispatch(command)).resolves.toEqual({ foo: 'bar' })
    expect(requestedCommand).toEqual(command)
  })
})
