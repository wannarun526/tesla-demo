import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import AuthRoute from './routers/auth';
import BaseRoute from './routers/base';
import initMongo from './configs/mongoConnect';
import compression from 'compression';
import JwtPassport from './middlewares/jwtpassport';
import 'dotenv/config';

class App {
    private app: Application;
    private routes: BaseRoute[] = [
        new AuthRoute(),
    ];
    
    private corsOptions = {
        origin: ["http://localhost:8080"],
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    };
    
    constructor() {
        new JwtPassport();
        this.app = express();
    
        this.app.set('port', process.env.PORT || 3000)

        initMongo();
        this.initMiddlewares();
        this.initRouter();
    }

    private initMiddlewares() {
        // for parsing json
        this.app.use(bodyParser.json({ limit: '20mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
        this.app.use(compression());
        this.app.use(cors(this.corsOptions))
        this.app.use(passport.initialize());
    }

    private initRouter(){
        this.routes.forEach((route: BaseRoute) => {
            this.app.use(`/api/${route.constructor.name.toString().replace("Route", "")}`, route.getRouter())
        })
    }
    
    public listen() {
        const port = this.app.get("port");
        this.app.listen( port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
}
 
new App().listen();
