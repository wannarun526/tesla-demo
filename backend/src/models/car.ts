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
    docPath: string;
    base64: string | null;
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
    vl01?: CarPic;
    vl02?: CarPic;
    car01?: CarPic;
    car02?: CarPic;
    car03?: CarPic;
    car04?: CarPic;
    car05?: CarPic;
    car06?: CarPic;
    car07?: CarPic;
    car08?: CarPic;
    car09?: CarPic;
    status: "pending" | "approved" | "failed";
}
