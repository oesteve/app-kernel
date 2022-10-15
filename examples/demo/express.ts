import {createDefinition} from "@oesteve/app-kernel/dist/di/container";
import App, {appTag} from "@oesteve/app-kernel";
import express, {Express, Router} from "express";
import {BeforeStartTag, OnStart} from "@oesteve/app-kernel/dist/life-cycle";

type Controller = (router: Router, app: App) => void  

class HttpServer implements OnStart {
    private port: number;
    private app: App;
    private express: Express;

    constructor(port: number, controllers: Controller[], app: App) {
        this.port = port
        this.express = express()
        this.app = app;
        this.registerController(controllers);
    }

    private registerController(controllers: Controller[]) {
        const router = Router()
        controllers.forEach(ctrl => ctrl(router, this.app))
        this.express.use(router)
    }

    async onBeforeStart() {
        return new Promise<void>(resolve => {
            this.express.listen(this.port, () => {
                console.log(`Example app listening on port http://127.0.0.1:${this.port}/`)
                resolve();
            })    
        })
    }
}

const counterCtrl: Controller = (router, app) =>
    router.get("/increment",(req, res) => {
        const counter = app.get(counterDef);
        counter.increment()
        
        res.send(`Count: ${counter.count}`)
    })


class Counter {
    count= 0;
    increment() {
        this.count++
    }
}


// Config section
const serverDef = createDefinition(
    'http-server',  // My Service name 
    (container) => new HttpServer(
        8000, 
        container.getByTag({name: 'controller'}), // Pass all controllers
        container.getOneByTag(appTag), // Pass the current app instance
    ),
    [ BeforeStartTag ]
);

const counterCtrlDef = createDefinition(
    'counter-controller',
    () => counterCtrl,
    [{ name: 'controller'}]
);

const counterDef = createDefinition(
    'counter-service',
    () => new Counter()
)

const app = new App([
    serverDef,
    counterCtrlDef,
    counterDef
])


// Run app
app.start().then(() => {
    console.log("App Started !")
})
