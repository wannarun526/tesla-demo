import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDateString } from "class-validator";
import { CarCreateReq, CarListUnorderedReq } from "../models/car";
import 'reflect-metadata'

export class CarCreateDto implements CarCreateReq{

    @IsString({ message: "model should be string" })
    @IsEnum(["Model 3", "Model X", "Model S"], { message: "model is not valid"})
    model!: "Model 3" | "Model X" | "Model S";

    @IsString({ message: "chargeType should be string" })
    @IsEnum(["CCS2", "TPC"], { message: "chargeType is not valid"})
    chargeType!: "CCS2" | "TPC";
    
    @IsString({ message: "spec should be string" })
    @IsEnum(["SR", "LR", "P"], { message: "spec is not valid"})
    spec!: "SR" | "LR" | "P";

    @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "year should be number" })
    year!: number;
    
    @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "season should be number" })
    @IsEnum([1, 2, 3, 4], { message: "season is not valid"})
    season!: 1 | 2 | 3 | 4;

    @IsString({ message: "carNumber should be string" })
    @IsNotEmpty({ message: "carNumber is required" })
    carNumber!: string;

    @IsDateString({ message: "insuranceStartDate should be date" })
    @IsNotEmpty({ message: "insuranceStartDate is required" })
    insuranceStartDate!: Date;
    
    @IsDateString({ message: "insuranceEndDate should be date" })
    @IsNotEmpty({ message: "insuranceEndDate is required" })
    insuranceEndDate!: Date;

    @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "replaceValue should be number" })
    replaceValue!: number;

    @IsString({ message: "insuranceCompany should be string" })
    @IsNotEmpty({ message: "insuranceCompany is required" })
    insuranceCompany!: string;

    @IsString({ message: "insuranceType should be string" })
    @IsNotEmpty({ message: "insuranceType is required" })
    insuranceType!: string;

    @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "sumAssured should be number" })
    sumAssured!: number;
}

export class CarListUnorderedDto implements CarListUnorderedReq {
    @IsDateString({ message: "endDate should be date" })
    @IsNotEmpty({ message: "endDate is required" })
    startDate!: Date;
    
    @IsDateString({ message: "endDate should be date" })
    @IsNotEmpty({ message: "endDate is required" })
    endDate!: Date;
}
