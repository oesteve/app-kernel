"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.Validator = exports.createValidator = exports.ValidatorMiddleware = void 0;
const container_1 = require("../../../di/container");
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_1 = __importDefault(require("ajv"));
class ValidatorMiddleware {
    constructor(container) {
        this.container = container;
    }
    execute(message, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationTag = {
                name: 'message-validator',
                messageName: message.name,
                messageNamespace: message.namespace
            };
            try {
                const validator = this.container.getOneByTag(validationTag);
                try {
                    validator.validate(message);
                }
                catch (err) {
                    return yield Promise.reject(err);
                }
            }
            catch (err) {
                if (!(err instanceof container_1.DefinitionNotFoundException)) {
                    throw err;
                }
            }
            return yield next(message);
        });
    }
}
exports.ValidatorMiddleware = ValidatorMiddleware;
function createValidator(definition) {
    const schema = definition.schema;
    if (schema == null) {
        throw new Error('Unable to generate a validator for message definition without schema defined ');
    }
    const validationTag = {
        name: 'message-validator',
        messageName: definition.name,
        messageNamespace: definition.namespace
    };
    return {
        name: `${typeof definition.namespace !== 'undefined' ? (definition.namespace) + '-' : ''}${definition.name}-validator`,
        factory: () => new Validator(schema),
        tags: [validationTag]
    };
}
exports.createValidator = createValidator;
class Validator {
    constructor(schema) {
        const ajv = new ajv_1.default({
            allErrors: true
        });
        (0, ajv_formats_1.default)(ajv);
        this.validator = ajv.compile(schema);
    }
    validate(message) {
        if (!this.validator(message.payload) && (this.validator.errors != null)) {
            throw new ValidationError('Validation error', this.validator.errors);
        }
    }
}
exports.Validator = Validator;
class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
    }
    getFields() {
        return this.errors.map((err) => err.instancePath.replace('/', ''));
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validator.js.map