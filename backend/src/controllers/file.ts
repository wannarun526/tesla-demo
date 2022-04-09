import { NextFunction, Request, Response } from 'express';
import { FileCarUploadReq } from '../models/file';
import { CarModel } from '../schemas/car';
import { FileModel } from '../schemas/file';
import { BaseController } from './base';

class FileController extends BaseController {

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
            const newfilePath = await this.util.uploadFile(body);

            // 3. 更新DB
            await new FileModel({
                userId: user._id,
                carId: body.carId,
                fileType: body.docType, 
                path: newfilePath, 
                originFileName: body.docName,
                mimeType: body.mimeType,
            }).save();

            return this.util.handleSuccess<null>(resp, null);
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }

    checkAuth = async(req: Request, resp: Response, next: NextFunction) => {
        try{
            const user = req.user as any;
            const file = await CarModel.findOne({ userId: user._id, path: `uploads${req.url}` });
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
