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

// Car/List

export interface CarPic{
    docType: "vl01" | "vl02" | "car01" | "car02" | "car03" | "car04" | "car05" | "car06" | "car07" | "car08" | "car09";
    docPath: string;
}
export interface CarListResp{
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
    carPics: Array<CarPic>;
}
