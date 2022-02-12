import { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import { matchedData } from 'express-validator';
import BaseController from './base';
import Utility from '../middlewares/utils';
import { ApiResult } from '../models/common';
 
class AuthController extends BaseController {

    private util = new Utility();
    




    register = async (req: Request, resp: Response) =>{
        try{
            const body = matchedData(req)
            const user = new UserModel({ ... body });
            const newUser = await this.util.saveHandle(user);
            this.util.handleSuccess(resp, newUser);
        }catch(error: any){
            console.log(error)
            this.util.handleError(resp, error)
        }
    }
}
 
export default AuthController;
