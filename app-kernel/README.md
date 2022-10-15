
# What's App Kernel ?

App kernel it's a library that acts as a set of components that help us to manage our applications. It contains:
 - A **DI**  (dependency injection) implementation whose responsibility is to manage the life cycle of our services and their 
dependencies.
 - A **Message Bus** that implements a Command and Query bus with a series of middlewares that provides a simple, powerful
and scalable way of consuming a service layer.

# An universal library
App kernel can be used both in browser and in server, this means that it allows us to use it in conjunction with our 
React, Vue, Express applications or in a serverless environment ...

It allows us to be more efficient when we implement client-server applications.

- It allows us to share knowledge and share components and working as the same way in both environments.
- The **Commands** and **Queries** generated for the client side could be consumed transparently by the server side, saving time 
in laborious and prone-errors processes. 

# How it's work

Although App Kernel being a highly opinionated implementation of a **CI** & **Message Bus**, it offers a great versatility
provided by a metadata layer associated to every service called **definitions**, these definitions are built on top of your 
existent services, and they shouldn't be coupled to your service layer. However, we cannot ignore that the nature of 
this library is to influence how we build our applications.

The definition service is a relatively complex configuration layer, Javascript doesn't provide a powerful enough type 
and reflection API to help us have an automatic configuration system that provide a quick and easy. Typescript provides 
some experimental features that can help us with configuration layer, but at the current stage of this project they 
aren't contemplated. 


# Dive deeper

You can find more detailed documentation over the components on:

 - [DI Container](docs/container.md)
 - [Command-Query Bus](docs/command-query-bus.md)
