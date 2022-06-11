import { IsString, IsNotEmpty, IsEmail, IsEnum, IsDateString, Matches, ValidatorConstraint, ValidationArguments, ValidatorConstraintInterface, Validate } from "class-validator";
import { AuthForgetPwdReq, AuthLoginReq, AuthRegisterReq, AuthResetPwdReq, AuthSendOtpReq, AuthUpdateUserReq, AuthVerifyOtpReq } from "../models/auth";
import 'reflect-metadata'

@ValidatorConstraint({ name: 'CustIdValid', async: false })
export class CustIdValid implements ValidatorConstraintInterface {
    validate(custId: string, args: ValidationArguments) {
        if(custId){
            //建立字母分數陣列(A~Z)
            const city = new Array(1,10,19,28,37,46,55,64,39,73,82, 2,11,20,48,29,38,47,56,65,74,83,21, 3,12,30)
            const id = custId.toUpperCase();
            //使用「正規表達式」檢驗格式
            if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
                return false;
            } else {
                //計算總分
                var total = city[id[0].charCodeAt(0)-65];
                for(var i=1; i<=8; i++){
                    total += eval(id[i]) * (9 - i);
                }
                //補上檢查碼(最後一碼)
                total += eval(id[9]);
                //檢查比對碼(餘數應為0);
                return (total%10 == 0) ? true : false;
            }
        }
        return false;
    }
}

export class AuthRegisterDto implements AuthRegisterReq{

    @IsString({ message: "custId should be string" })
    @IsNotEmpty({ message: "custId is required" })
    @Validate(CustIdValid, { message: "custId is invalid" })
    custId!: string;

    @IsString({ message: "password should be string" })
    @IsNotEmpty({ message: "password is required" })
    password!: string;

    @IsString({ message: "name should be string" })
    @IsNotEmpty({ message: "name is required" })
    name!: string;

    @IsString({ message: "cellphone should be string" })
    @IsNotEmpty({ message: "cellphone is required" })
    @Matches(/^09[0-9]{8}$/, {message: 'cellphone is invalid'})
    cellphone!: string;

    @IsString({ message: "email should be string" })
    @IsNotEmpty({ message: "email is required" })
    @IsEmail({ message: "email is not valid" })
    @Matches(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/, {message: 'email is invalid'})
    email!: string;

    @IsString({ message: "gender should be string" })
    @IsEnum(["male", "female"], { message: "gender should be male or female"})
    gender!: "male" | "female";

    @IsDateString({ message: "birthdate should be date" })
    @IsNotEmpty({ message: "birthdate is required" })
    birthdate!: Date;

    @IsString({ message: "role should be string" })
    @IsEnum(["user", "partner"], { message: "gender should be user or partner"})
    role!: "user" | "partner";
}

export class AuthLoginDto implements AuthLoginReq{

    @IsString({ message: "custId should be string" })
    @IsNotEmpty({ message: "custId is required" })
    @Validate(CustIdValid, { message: "custId is invalid" })
    custId!: string;

    @IsString({ message: "password should be string" })
    @IsNotEmpty({ message: "password is required" })
    password!: string;

    @IsString({ message: "role should be string" })
    @IsEnum(["user", "partner"], { message: "role should be user or partner"})
    role!: "user" | "partner";
}


export class AuthSendOtpDto implements AuthSendOtpReq{

    @IsString({ message: "custId should be string" })
    @IsNotEmpty({ message: "custId is required" })
    @Validate(CustIdValid, { message: "custId is invalid" })
    custId!: string;

    @IsString({ message: "cellPhone should be string" })
    @IsNotEmpty({ message: "cellPhone is required" })
    @Matches(/^09[0-9]{8}$/, {message: 'cellphone is invalid'})
    cellphone!: string;

    @IsString({ message: "role should be string" })
    @IsEnum(["user", "partner"], { message: "gender should be user or partner"})
    role!: "user" | "partner";
}

export class AuthVerifyOtpDto implements AuthVerifyOtpReq{

    @IsString({ message: "cellPhone should be string" })
    @IsNotEmpty({ message: "cellPhone is required" })
    @Matches(/^09[0-9]{8}$/, {message: 'cellphone is invalid'})
    cellphone!: string;

    @IsString({ message: "verifyCode should be string" })
    @IsNotEmpty({ message: "verifyCode is required" })
    @Matches(/^[0-9]{6}$/, {message: 'cellphone is invalid'})
    verifyCode!: string;
}

export class AuthResetPwdDto implements AuthResetPwdReq{

    @IsString({ message: "oldPassword should be string" })
    @IsNotEmpty({ message: "oldPassword is required" })
    oldPassword!: string;

    @IsString({ message: "newPassword should be string" })
    @IsNotEmpty({ message: "newPassword is required" })
    newPassword!: string;
}


export class AuthForgetPwdDto implements AuthForgetPwdReq{

    @IsString({ message: "custId should be string" })
    @IsNotEmpty({ message: "custId is required" })
    @Validate(CustIdValid, { message: "custId is invalid" })
    custId!: string;

    @IsString({ message: "email should be string" })
    @IsNotEmpty({ message: "email is required" })
    @IsEmail({ message: "email is not valid" })
    @Matches(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/, {message: 'email is invalid'})
    email!: string;
}

export class AuthUpdateUserDto implements AuthUpdateUserReq{

    @IsString({ message: "name should be string" })
    @IsNotEmpty({ message: "name is required" })
    name!: string;

    @IsString({ message: "gender should be string" })
    @IsEnum(["male", "female"], { message: "gender should be male or female"})
    gender!: "male" | "female";

    @IsString({ message: "cellphone should be string" })
    @IsNotEmpty({ message: "cellphone is required" })
    @Matches(/^09[0-9]{8}$/, {message: 'cellphone is invalid'})
    cellphone!: string;

    @IsString({ message: "email should be string" })
    @IsNotEmpty({ message: "email is required" })
    @IsEmail({ message: "email is not valid" })
    @Matches(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/, {message: 'email is invalid'})
    email!: string;

    @IsDateString({ message: "birthdate should be date" })
    @IsNotEmpty({ message: "birthdate is required" })
    birthdate!: Date;
}
