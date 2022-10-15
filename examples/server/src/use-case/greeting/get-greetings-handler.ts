import {QueryHandler} from "@oesteve/app-kernel/dist/bus/query/query";
import {createQueryHandler} from "@oesteve/app-kernel/dist/bus/handler-locator/di-handler-locator";
import {GetGreetingsPayload, GetGreetingsDef} from "./get-greetings-payload";

export class GetGreetingsHandler implements QueryHandler<GetGreetingsPayload, string>{
    handle(query: GetGreetingsPayload): Promise<string> {
        return Promise.resolve(`Hello ${query.name} !`);
    }
}

export const GreetingHandlerDef = createQueryHandler(
    GetGreetingsDef,
    () => new GetGreetingsHandler()
)
