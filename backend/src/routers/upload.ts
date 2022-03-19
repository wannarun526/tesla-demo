const trimRequest = require('trim-request');

import Route from "./base";
import passport from 'passport';
import UploadController from "../controllers/upload";
import { UploadDocDto } from "../controllers/upload.validate";

class UploadRoute extends Route{
    
    private uploadController: UploadController = new UploadController();
    private requireAuth = passport.authenticate('jwt', { session: false });

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post(
            '/document',
            this.requireAuth,
            trimRequest.all,
            this.uploadController.validateModel(UploadDocDto),
            this.uploadController.document,
        );
    }
}
export default UploadRoute;
