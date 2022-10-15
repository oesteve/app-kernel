import { Definition, DefinitionTag } from '../../di/container';
import { Message, MessageHandler } from '../bus';
import * as command from '../command/command';
import * as query from '../query/query';
import { Client, Route } from '../middleware/transport/transport-middleware';
import { ValidatorMiddleware } from '../middleware/validation/validator';
export declare const RouteTag: DefinitionTag;
export declare function createMessageRoute(name: string, supports: (message: Message<any>) => Boolean, clientDefinition: Definition<Client>): Definition<Route>;
export declare const ValidatorMiddlewareDef: Definition<ValidatorMiddleware>;
export declare const QueryBusDef: Definition<query.QueryBus>;
export declare const CommandBusDef: Definition<command.CommandBus>;
export declare const MessageHandlerDef: Definition<MessageHandler>;
//# sourceMappingURL=bus.d.ts.map