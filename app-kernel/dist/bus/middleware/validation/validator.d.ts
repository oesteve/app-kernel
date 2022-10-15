import { Message, MessageDefinition, Middleware } from '../../bus';
import { Container, Definition } from '../../../di/container';
import { ErrorObject, JSONSchemaType } from 'ajv';
export declare class ValidatorMiddleware implements Middleware {
    private readonly container;
    constructor(container: Container);
    execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R>;
}
export declare function createValidator<T>(definition: MessageDefinition<T>): Definition<Validator<T>>;
export declare class Validator<T> {
    private readonly validator;
    constructor(schema: JSONSchemaType<T>);
    validate(message: Message<T>): void;
}
export declare class ValidationError extends Error {
    errors: ErrorObject[];
    constructor(message: string, errors: ErrorObject[]);
    getFields(): string[];
}
//# sourceMappingURL=validator.d.ts.map