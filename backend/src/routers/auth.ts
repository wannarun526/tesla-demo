const trimRequest = require('trim-request');

import AuthController from "../controllers/auth"
import AuthValidate from "../controllers/auth.validate";
import Route from "./base";
import passport from 'passport';

class AuthRoute extends Route{

    private authController: AuthController = new AuthController();
    private authValidate: AuthValidate = new AuthValidate();
    private requireAuth = passport.authenticate('jwt', { session: false });

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {

        this.router.post(
            '/register',
            this.requireAuth,
            trimRequest.all,
            this.authValidate.registerValids,
            this.authController.register
        );

        this.router.post(
            '/login', 
            trimRequest.all,
            this.authValidate.registerValids, 
            this.authController.register
        );
    }
}

export default AuthRoute;
