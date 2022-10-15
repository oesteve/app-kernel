import { Message, Middleware } from '../bus';
export default class LoggerMiddleware implements Middleware {
    execute<T, R>(message: Message<T>, next: (messages: Message<T>) => Promise<R>): Promise<R>;
}
//# sourceMappingURL=logger.d.ts.map