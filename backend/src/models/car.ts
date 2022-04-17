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

export interface Pic{
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
    vl01?: Pic;
    vl02?: Pic;
    car01?: Pic;
    car02?: Pic;
    car03?: Pic;
    car04?: Pic;
    car05?: Pic;
    car06?: Pic;
    car07?: Pic;
    car08?: Pic;
    car09?: Pic;
    status: "pending" | "approved" | "failed";
}


// Car/ListUnordered
export interface CarListUnorderedReq{
    startDate: Date;
    endDate: Date;
}
