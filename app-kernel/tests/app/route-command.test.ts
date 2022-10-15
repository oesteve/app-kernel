import Index from "../../src";
import {createQuery, QueryHandler} from "../../src/bus/query/query";
import createHttpServer from "../../src/bus/config/create-http-server";
import {createQueryHandler} from "../../src/bus/handler-locator/di-handler-locator";
import {createDefinition} from "../../src/di/container";
import {createMessageRoute} from "../../src/bus/config/bus";
import {HttpClient} from "../../src/bus/middleware/transport/http-transport-client";


describe('Command should be router through difference transports', () => {
  const port = 4001
  let appServer: Index

  afterEach(async () => {
    await appServer?.stop()
  })

  test('Handler remote command', async () => {
    const query = createQuery<string, string>('my-query')

    const handler: QueryHandler<string, string> = {
      handle: async (query) => `Hello ${query}!`
    }
    appServer = new Index([
      createHttpServer(port),
      createQueryHandler(query, () => handler)
    ])
    await appServer.start()

    const client = createDefinition('client', () => new HttpClient(`http://127.0.0.1:${port}`))
    const route = createMessageRoute('greetings', () => true, client)
    const appClient = new Index([
      client,
      route
    ])

    const res = appClient.query(query.with('Oscar'))

    await res
    await expect(res).resolves.toEqual('Hello Oscar!')
  })
})
