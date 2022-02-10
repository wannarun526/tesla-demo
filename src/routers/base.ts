import {Router} from "express";

abstract class BaseRoute {
    
    protected router = Router();
    protected abstract setRoutes(): void;

    public getRouter() {
        return this.router;
    }
}

export default BaseRoute;
