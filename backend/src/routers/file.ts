const trimRequest = require('trim-request');

import Route from "./base";
import passport from 'passport';
import FileController from "../controllers/file";
import { FileAvatarUploadDto, FileCarUploadDto } from "../controllers/file.validate";

/**
 * 檔案上傳
 */
class FileRoute extends Route{

    private fileController: FileController = new FileController();
    private requireAuth = passport.authenticate('jwt', { session: false });

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {

        /**
         * 車輛圖檔PDF上傳
         */
        this.router.post(
            '/CarUpload',
            this.requireAuth,
            trimRequest.all,
            this.fileController.validateModel(FileCarUploadDto),
            this.fileController.carUpload,
        );

        /**
         * 頭像上傳
         */
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
