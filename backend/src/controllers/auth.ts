import { Request, Response } from 'express';
import { User, UserModel } from '../schemas/user';
import { BaseController } from './base';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthLoginReq, AuthLoginResp, AuthRegisterReq, AuthResetPwdReq } from '../models/auth';

class AuthController extends BaseController {

    register = async(req: Request, resp: Response) => {
        try{
            const body: AuthRegisterReq = req.body;
            const user = new UserModel({ ... body });
            const newUser = await this.util.saveHandle<User>(user);
            return this.util.handleSuccess<null>(resp, null);
        }catch(error: any){
            this.util.handleError(resp, error)
        }
    }

    login = async(req: Request, resp: Response) => {
        try{
            const body: AuthLoginReq = req.body;
            const user = await UserModel.findOne({ account: body.account });

            // 1.檢核密碼
            const isPwdPassed = bcrypt.compareSync(body.password, user?.password || "")
            if(!isPwdPassed){
                return this.util.handleError(resp, { message: "帳號或密碼錯誤" });
            }

            const result: AuthLoginResp = { 
                access_Token: this.generateToken((user?._id || "").toString())
            }
            return this.util.handleSuccess<AuthLoginResp>(resp, result);
        }catch(error: any){
            this.util.handleError(resp, error)
        }
    }

    resetPwd = async(req: Request, resp: Response) => {
        try{
            const user = req.user as any;
            const body: AuthResetPwdReq = req.body;

            // 1.檢核密碼
            const isPwdPassed = bcrypt.compareSync(body.oldPassword, user.password)
            if(!isPwdPassed){
                return this.util.handleError(resp, { message: "密碼錯誤" });
            }

            // 2.修改密碼
            user.password = body.newPassword;
            const newUser = await this.util.saveHandle<User>(user);

            return this.util.handleSuccess<null>(resp, null);
        }
        catch(error: any){
            this.util.handleError(resp, error)
        }
    }

    
    forgetPwd = async(req: Request, resp: Response) => {
        try{
        
        }
        catch(error: any){
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
