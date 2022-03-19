import { IsString, IsNotEmpty, IsEmail, IsEnum, IsDateString, ValidateNested, ArrayNotEmpty, IsBase64, IsArray, IsNotEmptyObject } from "class-validator";
import { AuthForgetPwdReq, AuthLoginReq, AuthRegisterReq, AuthResetPwdReq, AuthSendOtpReq, AuthVerifyOtpReq, RegisterDocReq } from "../models/auth";
import { Type } from 'class-transformer';
import 'reflect-metadata'

export class RegisterDocDto implements RegisterDocReq{

    @IsString({ message: "docName should be string" })
    @IsNotEmpty({ message: "docName is required" })
    docName!: string;

    @IsBase64({ message: "docContent should be base64 string" })
    @IsNotEmpty({ message: "docContent is required" })
    docContent!: string;
}

export class AuthRegisterDto implements AuthRegisterReq{

    @IsString({ message: "custId should be string" })
    @IsNotEmpty({ message: "custId is required" })
    custId!: string;

    @IsString({ message: "password should be string" })
    @IsNotEmpty({ message: "password is required" })
    password!: string;

    @IsString({ message: "name should be string" })
    @IsNotEmpty({ message: "name is required" })
    name!: string;
    
    @IsString({ message: "cellphone should be string" })
    @IsNotEmpty({ message: "cellphone is required" })
    cellphone!: string;
    
    @IsString({ message: "email should be string" })
    @IsEmail({ message: "email is not valid" })
    @IsNotEmpty({ message: "email is required" })
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

    @IsNotEmptyObject({ nullable: false }, { message: "id01 is required"})
    @ValidateNested({ each: true, message: "id01 is not valid"})
    @Type(() => RegisterDocDto)
    id01!: RegisterDocDto;
    
    @IsNotEmptyObject({ nullable: false }, { message: "id02 is required"})
    @ValidateNested({ each: true, message: "id02 is not valid"})
    @Type(() => RegisterDocDto)
    id02!: RegisterDocDto;
    
    @IsNotEmptyObject({ nullable: false }, { message: "dl01 is required"})
    @ValidateNested({ each: true, message: "dl01 is not valid"})
    @Type(() => RegisterDocDto)
    dl01!: RegisterDocDto;
    
    @IsNotEmptyObject({ nullable: false }, { message: "dl02 is required"})
    @ValidateNested({ each: true, message: "dl02 is not valid"})
    @Type(() => RegisterDocDto)
    dl02!: RegisterDocDto;
}

export class AuthLoginDto implements AuthLoginReq{

    @IsString({ message: "custId should be string" })
    @IsNotEmpty({ message: "custId is required" })
    custId!: string;

    @IsString({ message: "password should be string" })
    @IsNotEmpty({ message: "password is required" })
    password!: string;
}


export class AuthSendOtpDto implements AuthSendOtpReq{

    @IsString({ message: "cellPhone should be string" })
    @IsNotEmpty({ message: "cellPhone is required" })
    cellphone!: string;
}

export class AuthVerifyOtpDto implements AuthVerifyOtpReq{

    @IsString({ message: "cellPhone should be string" })
    @IsNotEmpty({ message: "cellPhone is required" })
    cellphone!: string;
    
    @IsString({ message: "verifyCode should be string" })
    @IsNotEmpty({ message: "verifyCode is required" })
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

    @IsString({ message: "email should be string" })
    @IsNotEmpty({ message: "email is required" })
    email!: string;

    @IsString({ message: "cellPhone should be string" })
    @IsNotEmpty({ message: "cellPhone is required" })
    cellphone!: string;
}
