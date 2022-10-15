# Container component

The most important component of the framework is the Dependency Injection container, we don't only use then as a DI,
every service has a set of metadata elements use it as a configuration provider. 

### Define dependencies

Before start using any dependency we need to define it, basically a definition is an implementation of `Definition`
interface. We also have a builder function to help us to create definitions:

    const myDefinition = createDefinition<number>(
        'bar',
        (container: Container) => 'foo'
    );

As the first argument we must provide a unique identifier, it is used for debugging purposes, and you may never
write it again, we will use the definition as a reference throughout the code.

As second argument we will use a factory function, this function will be called the first time that we, or any other
dependency, required it.

To make a definition instantiable or make it accessible to others you must provide it in the `App` initialization, we 
must pass an array with all definitions as first argument:

    const app = new App([
        myDefinition,
        anotherDefinition,
        ...
    ]);

### Retrieving dependencies

Following with the previous example, we could retrieve dependencies using the created definition:

    const myDefinition = createDefinition('bar', () => 'foo');
    const app = new App([myDefinition]);

    const bar = app.get(myDefinition);
    console.log(bar) // This will print: "foo"

### Covering dependencies

The previous example has been too simple, in the real world most dependencies require others to be instanced.
We can resolve the dependencies of our services using the container instance pass as first argument in the build function.
In this case we will create an `addTodo` handler that requires a repository to add a new task.

    const repositoryDef = createDefinition('task-repository', () => new TaskRepository());

    const addTaskHandlerDef = createDefinition(
        'add-task-handler',
        (container: Container) => {
            const repository = container.get(repositoryDef);
            return new AddTaskHandler(repository);
        }
    ));

    const app = new App([
        repositoryDef,
        addTaskHandlerDef
    ]);
    
    const addTaskHandler = app.get(addTaskHandlerDef);
    addTaskHandler.handle("Do homework");


### Provided definitions

Although you instance an `App` class without any definition, some `internal` definitions will be added to the container
component as command and query buses and some auxiliary dependencies.
