import { Message, MessageDefinition, Middleware } from '../../bus'
import { Container, Definition, DefinitionNotFoundException } from '../../../di/container'
import addFormats from 'ajv-formats'
import Ajv, { ErrorObject, JSONSchemaType, ValidateFunction } from 'ajv'

export class ValidatorMiddleware implements Middleware {
  constructor (private readonly container: Container) {
  }

  async execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R> {
    const validationTag: ValidatorServiceTag = {
      name: 'message-validator',
      messageName: message.name,
      messageNamespace: message.namespace
    }

    try {
      const validator = this.container.getOneByTag<Validator<T>>(validationTag)
      try {
        validator.validate(message)
      } catch (err) {
        return await Promise.reject(err)
      }
    } catch (err) {
      if (!(err instanceof DefinitionNotFoundException)) {
        throw err
      }
    }

    return await next(message)
  }
}

interface ValidatorServiceTag {
  name: 'message-validator'
  messageName: string
  messageNamespace?: string
}

export function createValidator<T> (
  definition: MessageDefinition<T>
): Definition<Validator<T>> {
  const schema = definition.schema
  if (schema == null) {
    throw new Error('Unable to generate a validator for message definition without schema defined ')
  }

  const validationTag: ValidatorServiceTag = {
    name: 'message-validator',
    messageName: definition.name,
    messageNamespace: definition.namespace
  }

  return {
    name: `${typeof definition.namespace !== 'undefined' ? (definition.namespace) + '-' : ''}${definition.name}-validator`,
    factory: () => new Validator<T>(schema as JSONSchemaType<T>),
    tags: [validationTag]
  }
}

export class Validator<T> {
  private readonly validator: ValidateFunction<T>

  constructor (schema: JSONSchemaType<T>) {
    const ajv = new Ajv({
      allErrors: true
    })

    addFormats(ajv)
    this.validator = ajv.compile(schema)
  }

  validate (message: Message<T>): void {
    if (!this.validator(message.payload) && (this.validator.errors != null)) {
      throw new ValidationError('Validation error', this.validator.errors)
    }
  }
}

export class ValidationError extends Error {
  errors: ErrorObject[]

  constructor (message: string, errors: ErrorObject[]) {
    super(message)
    this.errors = errors
  }

  getFields (): string[] {
    return this.errors.map((err) => err.instancePath.replace('/', ''))
  }
}
