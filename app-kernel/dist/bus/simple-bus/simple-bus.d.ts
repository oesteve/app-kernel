import { Message, MessageDefinition } from '../bus';
export interface SimpleBus {
    dispatch: <T, R>(message: Message<T>) => Promise<R>;
    addHandler: <T, R>(name: string, handler: (command: T) => Promise<R>) => MessageDefinition<T>;
}
export declare const createBus: () => SimpleBus;
//# sourceMappingURL=simple-bus.d.ts.map