import {GreetingHandlerDef} from "./use-case/greeting/get-greetings-handler";
import App from "@oesteve/app-kernel";
import createHttServer from '@oesteve/app-kernel/dist/bus/config/create-http-server'

const app = new App([
    createHttServer(8000),
    GreetingHandlerDef
])

app.start()
