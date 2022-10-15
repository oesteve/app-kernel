import {CommandBus, CommandHandler, createCommand} from "../../src/bus/command/command";
import {createCommandHandler, DiHandlerLocator} from "../../src/bus/handler-locator/di-handler-locator";
import {Container, createDefinition} from "../../src/di/container";


describe('DI handler locator', function () {

  test('Find and execute handler', () => {


    interface AddTask {
        name: string
    }

    class AddTaskHandler implements CommandHandler<AddTask> {
      
      public todos: string[] = []
      
      handle(command: AddTask): Promise<void> {
        this.todos.push(command.name)
        return Promise.resolve();
      }
    }

    const addTaskCommand = createCommand<AddTask>('add-task')
    const addTaskHandler = createCommandHandler( addTaskCommand, () => new AddTaskHandler())

    const commandBus = createDefinition(
      'command-bus',
      (container) => new CommandBus(new DiHandlerLocator(container))
    )

    const container = new Container([
      commandBus,
      addTaskHandler
    ])

    container
      .get(commandBus)
      .dispatch(addTaskCommand.with({ name: 'Do Laundry' }))

    
    const handler = container.get(addTaskHandler) as AddTaskHandler
    
    expect(handler.todos).toEqual(['Do Laundry'])
  })
})
