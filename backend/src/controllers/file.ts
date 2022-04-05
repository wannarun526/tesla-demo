import { Request, Response } from 'express';
import { arch } from 'os';
import { FileModel } from '../schemas/file';
import { BaseController } from './base';
import { FileUploadDto } from './file.validate';

class FileController extends BaseController {

    upload = async(req: Request, resp: Response) => {
        try{
            const user = req.user as any;
            const body: FileUploadDto = req.body;

            // 1. 圖檔上傳
            const newfilePath = await this.util.uploadFile(body);

            // 2. 更新DB
            await new FileModel({
                userId: user._id,
                fileType: body.docType, 
                path: newfilePath, 
                originFileName: body.docName, 
            }).save();

            return this.util.handleSuccess<null>(resp, null);
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }
}

export default FileController;
