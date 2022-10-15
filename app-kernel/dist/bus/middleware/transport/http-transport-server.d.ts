import { MessageHandler } from '../../bus';
export declare class HttpServer {
    private readonly host;
    private readonly port;
    private readonly expressInstance;
    private readonly handler;
    private expressServer;
    constructor(host: string, port: number, handler: MessageHandler);
    start(): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=http-transport-server.d.ts.map