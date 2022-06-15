import { IsString, IsNotEmpty, IsEnum, IsBase64 } from "class-validator";
import { FileAvatarUploadReq, FileCarUploadReq } from "../models/file";

/**
 * 車輛圖檔PDF上傳
 */
export class FileCarUploadDto implements FileCarUploadReq {

    @IsString({ message: "carId should be string" })
    @IsNotEmpty({ message: "carId is required" })
    carId!: string;

    @IsString({ message: "docType should be string" })
    @IsEnum(["vl01", "vl02", "car01", "car02", "car03", "car04", "car05", "car06", "car07", "car08", "car09", "carInsurancePDF"], { message: "docType should is not valid"})
    docType!: "vl01" | "vl02" | "car01" | "car02" | "car03" | "car04" | "car05" | "car06" | "car07" | "car08" | "car09" | "carInsurancePDF";

    @IsString({ message: "docName should be string" })
    @IsNotEmpty({ message: "docName is required" })
    docName!: string;

    @IsBase64({ message: "docContent should be base64 string" })
    @IsNotEmpty({ message: "docContent is required" })
    docContent!: string;

    @IsString({ message: "mimeType should be string" })
    @IsNotEmpty({ message: "mimeType is required" })
    mimeType!: string;
}

/**
 * 頭像上傳
 */
export class FileAvatarUploadDto implements FileAvatarUploadReq {
    @IsString({ message: "docName should be string" })
    @IsNotEmpty({ message: "docName is required" })
    docName!: string;

    @IsBase64({ message: "docContent should be base64 string" })
    @IsNotEmpty({ message: "docContent is required" })
    docContent!: string;

    @IsString({ message: "mimeType should be string" })
    @IsNotEmpty({ message: "mimeType is required" })
    mimeType!: string;
}
