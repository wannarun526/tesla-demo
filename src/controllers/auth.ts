import { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import BaseController from './base';
 
class AuthController extends BaseController {
    
    test = (req: Request, resp: Response) =>{
        UserModel.create<User>({
            name: "Sean", 
            email: "yunshanghong@gmail.com"
        })

        resp.send("OKOK");
    }
}
 
export default AuthController;
