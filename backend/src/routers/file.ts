const trimRequest = require('trim-request');

import Route from "./base";
import passport from 'passport';
import FileController from "../controllers/file";
import { FileUploadDto } from "../controllers/file.validate";

class FileRoute extends Route{
    
    private fileController: FileController = new FileController();
    private requireAuth = passport.authenticate('jwt', { session: false });

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post(
            '/upload',
            this.requireAuth,
            trimRequest.all,
            this.fileController.validateModel(FileUploadDto),
            this.fileController.upload,
        );
    }
}
export default FileRoute;
