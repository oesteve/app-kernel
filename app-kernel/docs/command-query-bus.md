# Message Bus Component

I found some definitions about a message bus:

 - A combination of a common data model, a common command set, and a messaging infrastructure to allow different systems to communicate through a shared set of interfaces. https://www.enterpriseintegrationpatterns.com/MessageBus.html
 - Solves the problem of how microservices communicate with each other. https://medium.com/usertesting-engineering/event-based-microservices-message-bus-5b4157d5a35d
 - In enterprises, there will be several disparate systems. These systems should be able to communicate and share data with one another and operate seamlessly for the effective functioning of the enterprise. https://www.oreilly.com/library/view/architectural-patterns/9781787287495/b58fbd04-d945-4416-8350-6290ae2aa1a2.xhtml
 - Is a way of organizing communication among objects which don't know about existence of each other. https://wiki.c2.com/?DataBusPattern
 - The Message Bus enables separate applications to work together in a decoupled manner so that applications can be easily added or removed without affecting each other. This approach makes maintenance and testing smoother, since editing or removing an application will not affect the functionality of any other application. https://docs.wso2.com/display/EIP/Message+Bus

## What's a message

We can define a message as a structure that contains the instructions that should be processed by our application, we can 
group these message by a type depending on their purpose, if they are requesting information, making modifications in our
application or notifying that something happened.   

## A message shape

We can see a message as a set of key-value data that should have ...

 - id: Required GUID  for every message send to a bus.
 - correlationId: Optional reference to the original message that starts a transaction.
 - type: message type, it could be 'command' or 'query', and no so far 'event' :)
 - name: the message type name eg: 'register-user', 'get-todos', ...  
 - namespace: a way to group messages
 - payload: the message payload, it will contain the properties of the message

## Message Bus Specialization

As we've could see, not all messages in our apps have the same purposes, commands, queries or events usually have their 
own way to be sent, transported, handled and in some cases returning information. Really all messages always have the 
same form and are the buses and the handlers those works differently in function on the type of the message.

### Command Bus

This bus handle event of type *command*, and we could define this type as *a messages with the instruction to make 
modification in our application*.

Its main features are:

 - Must be processed only by **one** handler
 - Don't return any response, we can throw an error as way to communicate that something was wrong.
 - Commands could be async

### Command Query

We will use this bus when we need retrieve information from our app and the query message will contain the query parameters.

The main characteristics of this bus are:

 - Must be processed only by **one** handler
 - Always return information
 - Messages are synchronous

## Middlewares

Middlewares allow us to access to every message sent to a bus, this allows us to intercept every message providing
shared functionalities to all messages. This is a common pattern in most http implementations and maybe could make sense
move any of these middlewares to the bus ones making these interceptors close to our domain and common to other 
access interfaces.


## How to use

### Creating a command

To create a command instance, first we need to create a **command definition** providing the name, namespace and a payload type.

    interface MyCommandPayload {
        bar: string
    }

    const myCommandDef = createCommand<MyCommandPayload>(
        'my-command',
        'my command-namespace'
    )

You shouldn't confuse a command definitions with the DI definitions, they are two different things, the commands 
definitions mustn't be passed to the App instance as we do with the DI definitions 

Additionally, we can provide a json schema for the payload validation as third argument:

    const schema = require('schema.json')

    const myCommandDef = createCommand<MyCommandPayload>(
        'my-command',
        'my-command-namespace',
        schema
    )

Once we have our command definition, we could create our command from the *definition*:

    const command = myCommandDef.with({bar:'foo'})

After this we can send it through our command bus:

    await app.dispatch(command)

The dispatch method will return a `void` Promise that will be resolved if the command will be sent successfully or a
rejection if something was wrong.

### Creating a query

Queries are similar to commands with the exception that they will return a response when send our message:

    interface GetGreetingPayload {
        name: string
    }

    interface GreetingResponse {
        message: string
    }

    const getGreetingDef = createQuery<GetGreetingPayload, GreetingResponse>(
        'get-greeting',
        'com.acme.greetings'
    )

    const greeting = await app.query(getGreetingDef.with({name: 'Alice'})

Note that we set a second generic at the definition, since we would have response, this type defines that response.

### Handlers

At the opposite side of command and query definitions we have the handlers. Basically, handlers are services tagged to
handle a specific message, these services must implement `QueryHandler` or `CommandHandler` depending on the message type.
To make easy the creation of these DI definitions of these services we can use the `createCommandHandler` and
`createQueryHandler`:

    const myCommandDef = createCommand<MyCommandPayload>(
        'my-command',
        'my-command-namespace',
        schema
    )

    const handlerDef = createCommandHandler(
        myCommandDef,
        (container: Container) => new MyCommandHandler()
    )

As the same way of the rest of the definitions, the handler definitions should be passed to the App instance:

    const app = new App([
        handlerDef
    ])
