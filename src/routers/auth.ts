// src/routes/auth.route.ts

import AuthController from "../controllers/authController"
import Route from "./route";

class AuthRoute extends Route{
    private authController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/login', this.authController.echo);
    }
}

export default AuthRoute;
