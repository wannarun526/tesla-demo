import { IsString, IsNotEmpty } from "class-validator";
import { AuthLoginReq, AuthRegisterReq } from "../models/auth";

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

