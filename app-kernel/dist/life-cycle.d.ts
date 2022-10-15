import { Container, Definition, DefinitionTag } from './di/container';
export declare const BeforeStopTag: DefinitionTag;
export declare const BeforeStartTag: DefinitionTag;
export declare const createBeforeStopDefinition: <T extends OnStop>(name: string, factory: (container: Container) => T) => Definition<T>;
export interface OnStop {
    onBeforeStop: () => Promise<void>;
}
export interface OnStart {
    onBeforeStart: () => Promise<void>;
}
//# sourceMappingURL=life-cycle.d.ts.map