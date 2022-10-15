import { Message, Middleware } from '../../bus';
export interface Client {
    send: (message: Message<any>) => Promise<any>;
}
export interface Route {
    send: (message: Message<any>) => Promise<any>;
    supports: (message: Message<any>) => Boolean;
}
export declare class TransportMiddleware implements Middleware {
    private readonly routes;
    constructor(routes: Route[]);
    execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R>;
}
//# sourceMappingURL=transport-middleware.d.ts.map