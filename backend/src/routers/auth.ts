const trimRequest = require('trim-request');

import AuthController from "../controllers/auth"
import { AuthRegisterDto } from "../controllers/auth.validate";
import Route from "./base";
import passport from 'passport';

class AuthRoute extends Route{

    private authController: AuthController = new AuthController();
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
            this.authController.validateModel(AuthRegisterDto),
            this.authController.register
        );

        this.router.post(
            '/login', 
            trimRequest.all,
            this.authController.login
        );

        this.router.post(
            "/test",
            (req, res, next) => { 
                res.status(200).json({data: "test"})
            }
        )
    }
}

export default AuthRoute;
