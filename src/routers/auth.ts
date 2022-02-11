import AuthController from "../controllers/auth"
import { testValidate } from "../controllers/auth.validate";
import Route from "./base";

class AuthRoute extends Route{

    private authController: AuthController = new AuthController();

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/login', testValidate, this.authController.test);
    }
}

export default AuthRoute;
