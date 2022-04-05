import { IsString, IsNotEmpty, IsEmail, IsEnum, IsDateString, ValidateNested, ArrayNotEmpty, IsBase64, IsArray, IsNotEmptyObject } from "class-validator";
import { FileUploadReq } from "../models/file";

export class FileUploadDto implements FileUploadReq {

    @IsString({ message: "docType should be string" })
    @IsEnum(["id01", "id02", "dl01", "dl02", "av01"], { message: "docType should be id01, id02, dl01, dl02, av01"})
    docType!: "id01" | "id02" | "dl01" | "dl02" | "av01";

    @IsString({ message: "docName should be string" })
    @IsNotEmpty({ message: "docName is required" })
    docName!: string;

    @IsBase64({ message: "docContent should be base64 string" })
    @IsNotEmpty({ message: "docContent is required" })
    docContent!: string;
}
