import { IsString, IsNotEmpty } from "class-validator";
export class AuthRegisterDto {

    @IsString({ message: "account should be string" })
    @IsNotEmpty({ message: "account is required" })
    account!: string;

    @IsString({ message: "name should be string" })
    @IsNotEmpty({ message: "name is required" })
    name!: string;
    
    @IsString({ message: "cellphone should be string" })
    @IsNotEmpty({ message: "cellphone is required" })
    cellphone!: string;
}

