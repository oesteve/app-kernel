import {createBus} from "../../src/bus/simple-bus/simple-bus";

test('Handle a command', () => {
  const todo:string[] = []

  const bus = createBus()
  
  const AddTask = bus.addHandler('add-task', (task: string) => {
    todo.push(task)
    return Promise.resolve()
  })

  bus.dispatch(AddTask.with('Do laundry'))

  expect(todo).toEqual(['Do laundry'])
})
