import * as command from './command/command';
import * as query from './query/query';
import { Message, MessageHandler } from './bus';
export declare class CommandQueryHandler implements MessageHandler {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: command.CommandBus, queryBus: query.QueryBus);
    handle<T>(message: Message<T>): Promise<any>;
}
//# sourceMappingURL=command-query-handler.d.ts.map