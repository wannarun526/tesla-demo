const trimRequest = require('trim-request');

import Route from "./base";
import passport from 'passport';
import FileController from "../controllers/file";
import { FileAvatarUploadDto, FileCarUploadDto } from "../controllers/file.validate";

class FileRoute extends Route{

    private fileController: FileController = new FileController();
    private requireAuth = passport.authenticate('jwt', { session: false });

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post(
            '/CarUpload',
            this.requireAuth,
            trimRequest.all,
            this.fileController.validateModel(FileCarUploadDto),
            this.fileController.carUpload,
        );

        this.router.post(
            '/avatarUpload',
            this.requireAuth,
            trimRequest.all,
            this.fileController.validateModel(FileAvatarUploadDto),
            this.fileController.avatarUpload,
        );
    }
}
export default FileRoute;
