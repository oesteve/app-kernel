import { BeforeStartTag, createBeforeStopDefinition, OnStart, OnStop } from '../../src/life-cycle'
import Index from '../../src'
import { createDefinition } from '../../src/di/container'

test('Execute on before stop', async () => {
  let stop = false

  const stopListener: OnStop = {
    async onBeforeStop (): Promise<void> {
      stop = true
      return await Promise.resolve()
    }

  }

  const app = new Index([
    createBeforeStopDefinition(
      'stop-test',
      () => stopListener
    )
  ])

  await app.stop()

  expect(stop).toBeTruthy()
})

test('Execute on before start', async () => {
  let start = false

  const startListener: OnStart = {
    async onBeforeStart (): Promise<void> {
      start = true
      return await Promise.resolve()
    }
  }

  const app = new Index([
    createDefinition(
      'before-start-test',
      () => startListener,
      [BeforeStartTag]
    )
  ])

  await app.start()

  expect(start).toBeTruthy()
})

test('Throw error if method have not been defined', async () => {
  let start = false

  const startListener = {
  }

  const app = new Index([
    createDefinition(
      'before-start-test',
      () => startListener,
      [BeforeStartTag]
    )
  ])


  await expect(app.start()).rejects.toThrow("The before-start-test definition has been marked with the tag before-start, but it does not implement \"onBeforeStart\" method");
})
