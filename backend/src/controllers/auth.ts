import { Request, Response } from 'express';
import { UserModel } from '../schemas/user';
import { BaseController } from './base';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import qs from 'qs';
import moment from 'moment';
import { AuthLoginReq, AuthLoginResp, AuthRegisterReq, AuthResetPwdReq, AuthSendOtpReq, AuthVerifyOtpReq } from '../models/auth';
import { OTPModel } from '../schemas/otp';


class AuthController extends BaseController {

    register = async(req: Request, resp: Response) => {
        try{
            const body: AuthRegisterReq = req.body;
            await new UserModel({ ... body }).save();
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

    sendOtp = async(req: Request, resp: Response) =>{
        try{
            const body: AuthSendOtpReq = req.body;

            const otpRecords = await OTPModel.find({ cellphone: body.cellphone }).sort({ createdAt: -1 });
            const otpLatest = otpRecords[0];
            const sendPeriod = 100;

            // 1. 同一手機當天發送超過5次
            if(otpRecords.filter(item => moment(item.createdAt).utc().isSame(moment(), 'D')).length >= 5){
                return this.util.handleError(resp, { message: "同一手機當天發送次數達上限" });
            }
            // 2. 100秒內是否重複發送驗證碼
            if(otpLatest && moment(otpLatest?.createdAt).utc().add(sendPeriod, "s").isAfter(moment())){
                return this.util.handleError(resp, { message: `${sendPeriod}秒內請勿重複發送驗證碼` });
            }

            // 3. 發送驗證碼
            const verifyCode = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
            const sendResult = await axios(
                {
                    method: 'post',
                    url: 'https://smsapi.mitake.com.tw/api/mtk/SmSend?CharsetURL=UTF8',
                    data: qs.stringify({
                        username: "83169910SMS",
                        password: "a0985263870",
                        dstaddr: body.cellphone,
                        smbody: `Fun電趣「簡訊動態密碼OTP」${verifyCode}，密碼100內有效。提醒您：請勿將您的登入資訊交予他人以保障安全`,
                    }),
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            await new OTPModel({ 
                cellphone: body.cellphone, 
                verifyCode: verifyCode,
                errorCount: 0
            }).save();

            console.log(verifyCode);

            return this.util.handleSuccess<null>(resp, null);
        }
        catch(error: any){
            this.util.handleError(resp, error)
        }
    }

    verifyOtp = async(req: Request, resp: Response) => {
        try{
            const body: AuthVerifyOtpReq = req.body;
            var otpRecord = await OTPModel.findOne({ cellphone: body.cellphone }).sort({ createdAt: -1 });
            
            // 1. 檢核同一驗證碼是否超過驗證次數
            if(otpRecord && otpRecord.errorCount >= 5){
                return this.util.handleError(resp, { message: "同一驗證碼超過驗證次數" });
            }
            
            // 2. 檢核驗證碼是否正確
            if(body.verifyCode !== otpRecord?.verifyCode){
                otpRecord && (otpRecord.errorCount += 1) && (await otpRecord.save());
                return this.util.handleError(resp, { message: "驗證碼錯誤" });
            }

            otpRecord && (otpRecord.errorCount = -1) && (await otpRecord.save());
            return this.util.handleSuccess<null>(resp, null);
        }
        catch(error: any){
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
            await user.save();

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
