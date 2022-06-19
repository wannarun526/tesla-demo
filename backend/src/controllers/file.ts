import { NextFunction, Request, Response } from 'express';
import { Pic } from '../models/car';
import { FileCarUploadReq } from '../models/file';
import { CarModel } from '../schemas/car';
import { FileModel } from '../schemas/file';
import { BaseController } from './base';

/**
 * 檔案上傳
 */
class FileController extends BaseController {

    /**
     * 車輛圖檔PDF上傳
     */
    carUpload = async(req: Request, resp: Response) => {
        try{
            const user = req.user as any;
            const body: FileCarUploadReq = req.body;

            // 1. 檢查CarId是否存在
            const car = await CarModel.findOne({ _id: body.carId, ownerId: user._id });
            if(!car){
                throw new Error("該車輛不存在");
            }

            // 2. 圖檔上傳
            const newfilePath = await this.util.uploadFile("documents", body);

            // 3. 更新DB
            const file = await new FileModel({
                userId: user._id,
                fileType: body.docType,
                path: newfilePath,
                originFileName: body.docName,
                mimeType: body.mimeType,
            }).save();

            car[body.docType] = file._id;
            await car.save();

            return this.util.handleSuccess<null>(resp, null);
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }

    /**
     * 頭像上傳
     */
    avatarUpload = async(req: Request, resp: Response) => {
        try{
            const user = req.user as any;
            const body: FileCarUploadReq = req.body;

            // 1. 圖檔上傳
            const newfilePath = await this.util.uploadFile("avatars", body);

            // 2. 刪除舊圖檔
            const oldFiles = await FileModel.find({ userId: user._id, fileType: "av01" });
            const allPromises = oldFiles.map(async file => { this.util.deleteFile(file.path) })
            await Promise.all(allPromises);

            // 2. 更新DB
            await FileModel.deleteMany({ userId: user._id, fileType: "av01" });

            const file = await new FileModel({
                userId: user._id,
                fileType: "av01",
                path: newfilePath,
                originFileName: body.docName,
                mimeType: body.mimeType,
            }).save();

            user.avatar = file._id;
            await user.save();

            return this.util.handleSuccess<Pic>(resp, { docPath: file.path, base64: null});
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }

    /**
     * 檔案下載權限驗證
     */
    checkAuth = async(req: Request, resp: Response, next: NextFunction) => {
        try{
            const file = await FileModel.findOne({ userId: req.query.ownerId, path: `uploads${req.path}` });
            if(!file){
                throw new Error("查無此檔案")
            }
            next()
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }
}

export default FileController;
