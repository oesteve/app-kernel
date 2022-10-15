import { MessageDefinition, HandlerLocator, Message } from '../bus';
import { Container, Definition, DefinitionTag } from '../../di/container';
import { CommandHandler } from '../command/command';
import { QueryHandler } from '../query/query';
export interface BusHandlerTag extends DefinitionTag {
    name: 'command-handler';
    commandName: string;
    commandNamespace?: string;
}
export declare function createCommandHandler<T>(command: MessageDefinition<T>, factory: (container: Container) => CommandHandler<T>, handlerTags?: DefinitionTag[]): Definition<CommandHandler<T>>;
export declare function createQueryHandler<T>(command: MessageDefinition<T>, factory: (container: Container) => QueryHandler<T, any>, handlerTags?: DefinitionTag[]): Definition<QueryHandler<T, any>>;
export declare class DiHandlerLocator implements HandlerLocator {
    private readonly container;
    constructor(container: Container);
    handlerFor<T, R>(message: Message<T>): (command: T) => Promise<R>;
}
//# sourceMappingURL=di-handler-locator.d.ts.map