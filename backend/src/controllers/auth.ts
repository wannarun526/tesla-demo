import { Request, Response } from 'express';
import { User, UserLogin, UserModel } from '../models/user';
import { BaseController } from './base';
import jsonwebtoken from 'jsonwebtoken';

class AuthController extends BaseController {

    register = async(req: Request, resp: Response) => {
        try{
            const body = req.body;
            const user = new UserModel({ ... body });
            const newUser = await this.util.saveHandle<User>(user);

            const result: UserLogin = { 
                access_Token: this.generateToken(newUser._id.toString())
            }
            this.util.handleSuccess(resp, result);
        }catch(error: any){
            console.log(error)
            this.util.handleError(resp, error)
        }
    }

    login = async(req: Request, resp: Response) => {
        try{
            const body = req.body;
            const user = await UserModel.findById({ id: body.id });
            this.util.handleSuccess(resp, user);
        }catch(error: any){
            console.log(error)
            this.util.handleError(resp, error)
        }
    }

    private generateToken = (userId: string) => {
        // Gets expiration time
        const time: number = parseInt(process.env.JWT_EXPIRATION_IN_MINUTES!, 10);
        const expiration = Math.floor(Date.now() / 1000) + 60 * time;

        const result = jsonwebtoken.sign(
            { id: userId, exp: expiration },
            process.env.JWT_SECRET!
        );
        return result
    }
}
 
export default AuthController;
