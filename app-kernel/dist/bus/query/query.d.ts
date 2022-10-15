import { Handler, HandlerLocator, Message, MessageDefinition, Middleware } from '../bus';
import { JSONSchemaType } from 'ajv';
export declare const TYPE = "query";
export interface Query<T, R> extends Message<T> {
    type: 'query';
}
export interface QueryDefinition<T, R> extends MessageDefinition<T> {
    with: (payload: T) => Query<T, R>;
}
export interface QueryHandler<T, R> extends Handler<T, R> {
    handle: (query: T) => Promise<R>;
}
export declare function createQuery<T, R>(name: string, namespace?: string, schema?: JSONSchemaType<T>): QueryDefinition<T, R>;
export declare class QueryBus {
    private readonly bus;
    constructor(handlerLocator: HandlerLocator, middlewares?: Middleware[]);
    query<T, R>(queryMessage: Query<T, R>): Promise<R>;
}
//# sourceMappingURL=query.d.ts.map