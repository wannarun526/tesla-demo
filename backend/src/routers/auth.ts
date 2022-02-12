const trimRequest = require('trim-request');

import AuthController from "../controllers/auth"
import AuthValidate from "../controllers/auth.validate";
import Route from "./base";

class AuthRoute extends Route{

    private authController: AuthController = new AuthController();
    private authValidate: AuthValidate = new AuthValidate();

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get(
            '/login', 
            trimRequest.all,
            this.authValidate.registerValids, 
            this.authController.register
        );
    }
}

export default AuthRoute;
