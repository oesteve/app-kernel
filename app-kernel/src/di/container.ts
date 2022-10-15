export interface DefinitionTag { name: string }

export interface Definition<T> {
  name: string
  factory: (container: Container) => T
  tags: DefinitionTag[]
}

interface InstanceDefinition<T> extends Definition <T>{
  instance?: T
}

export function createDefinition<T> (
  name: string,
  factory: (container: Container) => T,
  tags?: DefinitionTag[]
): Definition<T> {
  return {
    name,
    factory,
    tags: tags ?? []
  }
}

export class DefinitionNotFoundException extends Error {

}

export const scopeContextTag: DefinitionTag = {
  name: 'scope-context'
}

export class Container {
  readonly definitions: Array<InstanceDefinition<any>> = []

  constructor (
    definitions: Array<Definition<any>> = []
  ) {
    definitions.forEach((definition) => this.set(definition))
  }

  public get<T> (definition: Definition<T>): T {
    const instanceServiceDefinition = this.definitions.find((definitionIt) => definitionIt.name === definition.name)

    if (instanceServiceDefinition == null) {
      throw new DefinitionNotFoundException(`Definition for '${definition.name}' not found`)
    }
    return this.getInstanceFor(instanceServiceDefinition)
  }

  private getInstanceFor<T> (instanceServiceDefinition: InstanceDefinition<T>): T {
    if (typeof instanceServiceDefinition.instance === 'undefined') {
      instanceServiceDefinition.instance = instanceServiceDefinition.factory(this)
    }

    return instanceServiceDefinition.instance
  }

  set<T> (definition: Definition<T>): void {
    for (let i = 0; this.definitions.length > i; i++) {
      if (this.definitions[i].name === definition.name) {
        this.definitions[i] = definition
        return
      }
    }

    this.definitions.push(definition)
  }

  /**
   * @throws DefinitionNotFoundException
   */
  getOneByTagName<T>(name: string): T {
    const instanceServiceDefinition = this.definitions.find((definitionIt) => {
      return !(definitionIt.tags.find(tag => tag.name === name) == null)
    })

    if (instanceServiceDefinition == null) {
      throw new DefinitionNotFoundException(`Service with tag name '${name}' not found`)
    }

    return this.getInstanceFor(instanceServiceDefinition)
  }

  getOneByTag<T>(tag: DefinitionTag): T {
    const instanceServiceDefinition = this.definitions.find((definition) => {
      return definition.tags.find(definitionTag => {
        return isEquivalent(tag, definitionTag)
      })
    })

    if (instanceServiceDefinition == null) {
      throw new DefinitionNotFoundException(`Service with tag '${JSON.stringify(tag)}' not found`)
    }

    return this.getInstanceFor(instanceServiceDefinition)
  }

  getByTag<T>(tag: DefinitionTag): T[] {
    const definitions = this.getDefinitionsByTag<T>(tag)
    return definitions.map((def) => this.get(def))
  }

  clone (): Container {
    return new Container(this.definitions.map(definition => {
      if (definition.tags.includes(scopeContextTag)) {
        return { ...definition, instance: undefined }
      }
      return definition
    }))
  }

  getDefinitionsByTag<T>(tag: DefinitionTag): Array<Definition<T>> {
    return this.definitions.filter((definition) => {
      return definition.tags.find(definitionTag => {
        return isEquivalent(tag, definitionTag)
      })
    })
  }
}

function isEquivalent (a: object, b: object): Boolean {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  // If number of properties is different,
  // objects are not equivalent
  // eslint-disable-next-line eqeqeq
  if (aProps.length != bProps.length) {
    return false
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]

    // If values of same property are not equal,
    // objects are not equivalent
    // @ts-expect-error
    if (a[propName] !== b[propName]) {
      return false
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true
}
