import {createQuery, QueryBus} from "../../src/bus/query/query";
import {InMemoryHandlerLocator} from "../../src/bus/handler-locator/in-memory-handler-locator";


describe('Queries', function () {
  test('Handle a query', async () => {

    const GetGreetings = createQuery<{ name: string }, string>('get-greetins')

    const handlerLocator = new InMemoryHandlerLocator()
    handlerLocator.addHandler(GetGreetings,(getGreetings) => {
      return Promise.resolve(`Hello ${getGreetings.name} !`)
    })

    const queryBus = new QueryBus(handlerLocator)
    const greetings = await queryBus.query(GetGreetings.with({name: 'Oscar'}))
    
    expect(greetings).toEqual("Hello Oscar !")
  })
})
