"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.scopeContextTag = exports.DefinitionNotFoundException = exports.createDefinition = void 0;
function createDefinition(name, factory, tags) {
    return {
        name,
        factory,
        tags: tags !== null && tags !== void 0 ? tags : []
    };
}
exports.createDefinition = createDefinition;
class DefinitionNotFoundException extends Error {
}
exports.DefinitionNotFoundException = DefinitionNotFoundException;
exports.scopeContextTag = {
    name: 'scope-context'
};
class Container {
    constructor(definitions = []) {
        this.definitions = [];
        definitions.forEach((definition) => this.set(definition));
    }
    get(definition) {
        const instanceServiceDefinition = this.definitions.find((definitionIt) => definitionIt.name === definition.name);
        if (instanceServiceDefinition == null) {
            throw new DefinitionNotFoundException(`Definition for '${definition.name}' not found`);
        }
        return this.getInstanceFor(instanceServiceDefinition);
    }
    getInstanceFor(instanceServiceDefinition) {
        if (typeof instanceServiceDefinition.instance === 'undefined') {
            instanceServiceDefinition.instance = instanceServiceDefinition.factory(this);
        }
        return instanceServiceDefinition.instance;
    }
    set(definition) {
        for (let i = 0; this.definitions.length > i; i++) {
            if (this.definitions[i].name === definition.name) {
                this.definitions[i] = definition;
                return;
            }
        }
        this.definitions.push(definition);
    }
    /**
     * @throws DefinitionNotFoundException
     */
    getOneByTagName(name) {
        const instanceServiceDefinition = this.definitions.find((definitionIt) => {
            return !(definitionIt.tags.find(tag => tag.name === name) == null);
        });
        if (instanceServiceDefinition == null) {
            throw new DefinitionNotFoundException(`Service with tag name '${name}' not found`);
        }
        return this.getInstanceFor(instanceServiceDefinition);
    }
    getOneByTag(tag) {
        const instanceServiceDefinition = this.definitions.find((definition) => {
            return definition.tags.find(definitionTag => {
                return isEquivalent(tag, definitionTag);
            });
        });
        if (instanceServiceDefinition == null) {
            throw new DefinitionNotFoundException(`Service with tag '${JSON.stringify(tag)}' not found`);
        }
        return this.getInstanceFor(instanceServiceDefinition);
    }
    getByTag(tag) {
        const definitions = this.getDefinitionsByTag(tag);
        return definitions.map((def) => this.get(def));
    }
    clone() {
        return new Container(this.definitions.map(definition => {
            if (definition.tags.includes(exports.scopeContextTag)) {
                return Object.assign(Object.assign({}, definition), { instance: undefined });
            }
            return definition;
        }));
    }
    getDefinitionsByTag(tag) {
        return this.definitions.filter((definition) => {
            return definition.tags.find(definitionTag => {
                return isEquivalent(tag, definitionTag);
            });
        });
    }
}
exports.Container = Container;
function isEquivalent(a, b) {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    // If number of properties is different,
    // objects are not equivalent
    // eslint-disable-next-line eqeqeq
    if (aProps.length != bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];
        // If values of same property are not equal,
        // objects are not equivalent
        // @ts-expect-error
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
}
//# sourceMappingURL=container.js.map