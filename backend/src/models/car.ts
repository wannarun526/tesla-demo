// Car/Create
export interface CarCreateReq {
    model: 'Model 3' | 'Model X' | 'Model S'
    chargeType: 'CCS2' | 'TPC'
    spec: 'SR' | 'LR' | 'P'
    year: number
    season: number
    carNumber: string
    carPrice: number
    sumAssured: number
    insuranceArray: CarInsurance[]
}

export interface CarInsurance {
    insuranceStartDate: Date
    insuranceEndDate: Date
    insuranceCompany: string
    insurancePrice: number
    insuranceType: string
}

export interface CarCreateResp {
    carId: string
}

// Car/List

export interface Pic {
    docPath: string
    base64: string | null
}
export interface CarListResp {
    id: string
    model: 'Model 3' | 'Model X' | 'Model S'
    chargeType: 'CCS2' | 'TPC'
    spec: 'SR' | 'LR' | 'P'
    year: number
    season: 1 | 2 | 3 | 4
    carNumber: string
    carPrice: number
    sumAssured: number
    insuranceArray: CarInsurance[]
    vl01?: Pic
    vl02?: Pic
    car01?: Pic
    car02?: Pic
    car03?: Pic
    car04?: Pic
    car05?: Pic
    car06?: Pic
    car07?: Pic
    car08?: Pic
    car09?: Pic
    carInsurancePDF?: Pic
    status: 'pending' | 'approved' | 'rejected'
    owner: Owner
    createdAt: Date
    rentPrice: number | null
}

export interface Owner {
    id: string
    cellphone: string
    name: string
    email: string
}

// Car/ListUnordered
export interface CarListUnorderedReq {
    startDate: Date
    endDate: Date
}

// Car/AuditApprove
export interface CarAuditApproveReq {
    carId: string
    rentPrice: number
}

// Car/AuditReject
export interface CarAuditRejectReq {
    carId: string
    rejectReason: string
}
