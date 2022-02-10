// src/routes/auth.route.ts

import AuthController from "../controllers/auth"
import Route from "./base";

class AuthRoute extends Route{

    private authController: AuthController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/login', this.authController.test);
    }
}

export default AuthRoute;
