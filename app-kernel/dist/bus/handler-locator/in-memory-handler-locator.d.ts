import { HandlerLocator, Message, MessageDefinition } from '../bus';
export declare class InMemoryHandlerLocator implements HandlerLocator {
    private handlerMap;
    addHandler<T, R>(commandDefinition: MessageDefinition<T>, handler: (payload: T) => Promise<R>): void;
    handlerFor(message: Message<any>): (command: any) => any;
}
//# sourceMappingURL=in-memory-handler-locator.d.ts.map