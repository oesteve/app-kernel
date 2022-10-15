import { Container, Definition, DefinitionTag } from './di/container';
import { Command } from './bus/command/command';
import { Query } from './bus/query/query';
export declare const appTag: DefinitionTag;
export default class App {
    readonly container: Container;
    private started;
    constructor(definitions?: Array<Definition<any>>);
    dispatch<T>(queryMessage: Command<T>): Promise<void>;
    query<T, R>(queryMessage: Query<T, R>): Promise<R>;
    get<T>(definition: Definition<T>): T;
    stop(): Promise<void>;
    start(): Promise<void>;
    private startIfNeeded;
}
//# sourceMappingURL=app.d.ts.map