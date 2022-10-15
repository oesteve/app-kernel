export interface DefinitionTag {
    name: string;
}
export interface Definition<T> {
    name: string;
    factory: (container: Container) => T;
    tags: DefinitionTag[];
}
interface InstanceDefinition<T> extends Definition<T> {
    instance?: T;
}
export declare function createDefinition<T>(name: string, factory: (container: Container) => T, tags?: DefinitionTag[]): Definition<T>;
export declare class DefinitionNotFoundException extends Error {
}
export declare const scopeContextTag: DefinitionTag;
export declare class Container {
    readonly definitions: Array<InstanceDefinition<any>>;
    constructor(definitions?: Array<Definition<any>>);
    get<T>(definition: Definition<T>): T;
    private getInstanceFor;
    set<T>(definition: Definition<T>): void;
    /**
     * @throws DefinitionNotFoundException
     */
    getOneByTagName<T>(name: string): T;
    getOneByTag<T>(tag: DefinitionTag): T;
    getByTag<T>(tag: DefinitionTag): T[];
    clone(): Container;
    getDefinitionsByTag<T>(tag: DefinitionTag): Array<Definition<T>>;
}
export {};
//# sourceMappingURL=container.d.ts.map