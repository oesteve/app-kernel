import {Container, createDefinition, Definition, DefinitionTag} from './di/container'
import { CommandBusDef, MessageHandlerDef, QueryBusDef, ValidatorMiddlewareDef } from './bus/config/bus'
import { Command } from './bus/command/command'
import { Query } from './bus/query/query'
import { BeforeStartTag, BeforeStopTag, OnStart, OnStop } from './life-cycle'

export const appTag: DefinitionTag = {
  name: 'app'
}

export default class App {
  readonly container: Container
  private started = false

  constructor (definitions: Array<Definition<any>> = []) {
    const app = createDefinition('app', () => this, [appTag])
    this.container = new Container([
      ...definitions,
      app,
      ValidatorMiddlewareDef,
      CommandBusDef,
      QueryBusDef,
      MessageHandlerDef
    ])
  }

  async dispatch<T>(queryMessage: Command<T>): Promise<void> {
    await this.startIfNeeded()
    return await this.container.get(CommandBusDef).dispatch(queryMessage)
  }

  async query<T, R>(queryMessage: Query<T, R>): Promise<R> {
    await this.startIfNeeded()
    return await this.container.get(QueryBusDef).query(queryMessage)
  }

  get<T>(definition: Definition<T>): T {
    void this.startIfNeeded()
    return this.container.get(definition)
  }

  async stop (): Promise<void> {
    const res = this.container.getByTag<OnStop>(BeforeStopTag)
      .map(async (instance) => await instance.onBeforeStop())
    await Promise.all(res)
  }

  async start (): Promise<void> {
    return await this.startIfNeeded()
  }

  private async startIfNeeded (): Promise<void> {
    if (!this.started) {
      const res = this.container.getDefinitionsByTag<OnStart>(BeforeStartTag)
        .map(async (definition) => {
          const instance = this.container.get(definition)

          if (typeof instance.onBeforeStart !== 'function') {
            throw new Error(`The ${definition.name} definition has been marked with the tag ${BeforeStartTag.name}, but it does not implement "onBeforeStart" method`)
          }

          return await instance.onBeforeStart()
        })

      await Promise.all(res)
      this.started = true
      return
    }

    return await Promise.resolve()
  }
}
