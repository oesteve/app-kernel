export interface Message<T> {
    name: string;
    namespace?: any;
    payload: T;
    id: string;
    correlationId?: string;
    type?: string;
}
export interface Handler<T, R> {
    handle: (command: T) => Promise<R>;
}
export interface HandlerLocator {
    handlerFor: <T, R>(message: Message<T>) => (message: T) => Promise<R>;
}
export interface Middleware {
    execute: <T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>) => Promise<R>;
}
export interface MessageHandler {
    handle: (message: Message<any>) => Promise<any>;
}
export interface MessageDefinition<T> {
    with: (payload: T) => Message<T>;
    name: string;
    namespace?: string;
    schema?: object;
}
export declare class ExecutorMiddleware implements Middleware {
    handlers: HandlerLocator;
    constructor(handlerLocator: HandlerLocator);
    execute<T>(message: Message<T>, next: (messages: Message<T>) => any): any;
}
export declare class HandlerNotFoundError extends Error {
    static forMessage(message: Message<any>): HandlerNotFoundError;
}
export declare class Bus {
    handlerLocator: HandlerLocator;
    executionChain: (message: Message<any>) => Promise<any>;
    constructor(handlerLocator: HandlerLocator);
    addMiddleware(middleware: Middleware): void;
    dispatch<T, R>(message: Message<T>): Promise<R>;
}
export declare const generateId: () => string;
//# sourceMappingURL=bus.d.ts.map