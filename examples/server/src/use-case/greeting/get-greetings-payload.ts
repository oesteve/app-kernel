import {createQuery} from "@oesteve/app-kernel/dist/bus/query/query";

export interface GetGreetingsPayload {
    name: string
}

export const GetGreetingsDef = createQuery<GetGreetingsPayload, string>('greetings', 'server')
