// Car/Create
export interface CarCreateReq{
    model: "Model 3" | "Model X" | "Model S";
    chargeType: "CCS2" | "TPC";
    spec: "SR" | "LR" | "P";
    year: number;
    season: 1 | 2 | 3 | 4;
    carNumber: string;
    insuranceStartDate: Date;
    insuranceEndDate: Date;
    replaceValue: number;
    insuranceCompany: string;
    insuranceType: string;
    sumAssured: number;
}

export interface CarCreateResp{
    carId: string;
}
