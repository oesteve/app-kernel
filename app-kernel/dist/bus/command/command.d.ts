import { HandlerLocator, Message, MessageDefinition, Middleware } from '../bus';
export declare const TYPE = "command";
export interface Command<T> extends Message<T> {
    type: 'command';
}
export interface CommandDefinition<T> extends MessageDefinition<T> {
    type: 'command';
    with: (payload: T) => Command<T>;
}
export interface CommandHandler<T> {
    handle: (command: T) => Promise<void>;
}
export declare function createCommand<T>(name: string, namespace?: string | undefined, schema?: object): CommandDefinition<T>;
/**
 * Prevent return data
 */
export declare class CommandMiddleware implements Middleware {
    execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R>;
}
export declare class CommandBus {
    private readonly bus;
    constructor(handlerLocator: HandlerLocator, middlewares?: Middleware[]);
    dispatch<T>(queryMessage: Command<T>): Promise<void>;
}
//# sourceMappingURL=command.d.ts.map