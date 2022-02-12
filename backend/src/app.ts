import express, { Application } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import AuthRoute from './routers/auth';
import BaseRoute from './routers/base';
import initMongo from './configs/mongoConnect';
 
class App {
    private app: Application;
    private routes: BaseRoute[] = [
        new AuthRoute(),
    ];
    
    constructor() {
        this.app = express();
    
        initMongo();
        this.initMiddlewares();
        this.initRouter();
    }

    private initMiddlewares() {
        // for parsing json
        this.app.use(bodyParser.json({ limit: '20mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
    }

    private initRouter(){
        this.routes.forEach((route: BaseRoute) => {
            this.app.use(`/api/${route.constructor.name.toString().replace("Route", "")}`, route.getRouter())
        })
    }
    
    public listen() {
        const port = process.env.PORT || "3000";
        this.app.listen( port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
}
 
new App().listen();
