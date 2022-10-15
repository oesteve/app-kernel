import { Container, Definition, DefinitionTag } from './di/container'

export const BeforeStopTag: DefinitionTag = {
  name: 'before-stop'
}

export const BeforeStartTag: DefinitionTag = {
  name: 'before-start'
}

export const createBeforeStopDefinition = <T extends OnStop >(name: string, factory: (container: Container) => T): Definition<T> => {
  return {
    name,
    factory,
    tags: [BeforeStopTag]
  }
}

export interface OnStop {
  onBeforeStop: () => Promise<void>
}

export interface OnStart {
  onBeforeStart: () => Promise<void>
}
