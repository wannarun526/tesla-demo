import { Request, Response } from 'express';
import { UploadDocumentReq } from '../models/upload';
import { DocumentModel } from '../schemas/document';
import { BaseController } from './base';

class UploadController extends BaseController {

    document = async(req: Request, resp: Response) => {
        try{
            const user = req.user as any;
            const body: UploadDocumentReq = req.body;
            
            // 1. 證件圖上傳
            const newfileName = await this.util.uploadFile(body.docContent, body.docName);

            // 2. 更新DB
            await new DocumentModel({
                userId: user._id,
                fileType: body.docType, 
                path: `documents/${newfileName}`, 
                originFileName: body.docName, 
            }).save();

            return this.util.handleSuccess<null>(resp, null);
        }catch(error: any){
            this.util.handleError(resp, error)
        }
    }
}

export default UploadController;
