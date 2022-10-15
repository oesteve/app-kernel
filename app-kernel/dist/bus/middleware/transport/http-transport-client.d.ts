import { Client } from './transport-middleware';
import { Message } from '../../bus';
export declare class HttpClient implements Client {
    private readonly baseURL;
    private readonly instance;
    constructor(baseURL: string);
    send(message: Message<any>): Promise<any>;
}
//# sourceMappingURL=http-transport-client.d.ts.map