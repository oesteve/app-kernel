import {CommandHandler, createCommand} from "../../src/bus/command/command";
import {createCommandHandler} from "../../src/bus/handler-locator/di-handler-locator";
import {createValidator, ValidationError} from "../../src/bus/middleware/validation/validator";
// @ts-ignore
import schema from './__test__/AddTask.schema.json';
import Index from "../../src";


describe("Should validate message payloads", () => {
    test("error on invalid type", async () => {

        type Payload = { task: string };

        const AddTask = createCommand<Payload>(
            'add-task',
            'app',
            schema
        );

        class AddTaskHandler implements CommandHandler<Payload> {
            handle(command: Payload): Promise<void> {
                return Promise.resolve(undefined);
            }
        }

        const app = new Index([
            createCommandHandler(AddTask, () => new AddTaskHandler()),
            createValidator(AddTask)
        ])

        // @ts-ignore
        const message = AddTask.with({"bar": "foo"});

        await expect(app.dispatch(message)).rejects.toBeInstanceOf(ValidationError)
    })
})
