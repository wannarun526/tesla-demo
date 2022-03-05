import { IsString, IsNotEmpty } from "class-validator";
import { AuthForgetPwdReq, AuthLoginReq, AuthRegisterReq, AuthResetPwdReq } from "../models/auth";

export class AuthRegisterDto implements AuthRegisterReq{

    @IsString({ message: "account should be string" })
    @IsNotEmpty({ message: "account is required" })
    account!: string;

    @IsString({ message: "password should be string" })
    @IsNotEmpty({ message: "password is required" })
    password!: string;

    @IsString({ message: "name should be string" })
    @IsNotEmpty({ message: "name is required" })
    name!: string;
    
    @IsString({ message: "cellphone should be string" })
    @IsNotEmpty({ message: "cellphone is required" })
    cellphone!: string;
}

export class AuthLoginDto implements AuthLoginReq{

    @IsString({ message: "account should be string" })
    @IsNotEmpty({ message: "account is required" })
    account!: string;

    @IsString({ message: "password should be string" })
    @IsNotEmpty({ message: "password is required" })
    password!: string;
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

    @IsString({ message: "email should be string" })
    @IsNotEmpty({ message: "email is required" })
    email!: string;

    @IsString({ message: "cellPhone should be string" })
    @IsNotEmpty({ message: "cellPhone is required" })
    cellPhone!: string;
}
