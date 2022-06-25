export enum ApiEndpoint {
    // Auth
    AuthRegister = '/Auth/Register',
    AuthLogin = '/Auth/Login',
    AuthSendOtp = '/Auth/SendOtp',
    AuthVerifyOtp = '/Auth/VerifyOtp',
    AuthResetPwd = '/Auth/ResetPwd',
    AuthForgetPwd = '/Auth/ForgetPwd',
    AuthUserInfo = '/Auth/UserInfo',
    AuthUpdateUser = '/Auth/UpdateUser',

    // File
    FileCarUpload = '/File/CarUpload',
    FileAvatarUpload = '/File/AvatarUpload',

    // Car
    CarCreate = '/Car/Create',
    CarList = '/Car/List',
    CarListUnordered = '/Car/ListUnordered',

    // Order
    OrderCreate = '/Order/Create',
    OrderListMyOrders = '/Order/ListMyOrders',
    OrderListRentOrders = '/Order/ListRentOrders',
}

export interface ApiModel<T> {
    errorMsg: string;
    data: T;
}

// Auth/Register
export interface AuthRegisterReq {
    custId: string;
    password: string;
    name: string;
    cellphone: string;
    email: string;
    gender: 'male' | 'female';
    birthdate: Date;
    role: 'user' | 'partner';
}

// Auth/Login
export interface AuthLoginReq {
    custId: string;
    password: string;
    role: 'user' | 'partner';
}
export interface AuthLoginResp {
    userId: string;
    accessToken: string;
    name: string;
    email: string;
    cellphone: string;
    gender: 'male' | 'female';
    role: {
        user: boolean;
        partner: boolean;
    };
    birthdate: Date;
    custId: string;
    createdAt: Date;
    avatar: Pic;
}

// Auth/SendOtp
export interface AuthSendOtpReq {
    custId: string;
    cellphone: string;
    role: 'user' | 'partner';
}

export interface AuthSendOtpResp {
    sendTime: Date;
    custId: string | null;
    name: string | null;
    email: string | null;
    gender: 'male' | 'female' | null;
    birthdate: Date | null;
}

// Auth/VerifyOtp
export interface AuthVerifyOtpReq {
    cellphone: string;
    verifyCode: string;
}

// Auth/ResetPwd
export interface AuthResetPwdReq {
    oldPassword: string;
    newPassword: string;
}

// Auth/ForgetPwd
export interface AuthForgetPwdReq {
    custId: string;
    email: string;
}

// Auth/UpdateUser
export interface AuthUpdateUserReq {
    name: string;
    gender: 'male' | 'female';
    cellphone: string;
    email: string;
    birthdate: Date;
}

// Car/Create
export interface CarCreateReq {
    model: 'Model 3' | 'Model X' | 'Model S';
    chargeType: 'CCS2' | 'TPC';
    spec: 'SR' | 'LR' | 'P';
    year: number;
    season: number;
    carNumber: string;
    carPrice: number;
    sumAssured: number;
    insuranceArray: CarInsurance[];
}

export interface CarInsurance {
    insuranceStartDate: Date;
    insuranceEndDate: Date;
    insuranceCompany: string;
    insurancePrice: number;
    insuranceType: string;
}

export interface CarCreateResp {
    carId: string;
}

// Car/List

export interface Pic {
    docPath: string;
    base64: string | null;
}
export interface CarListResp {
    id: string;
    model: 'Model 3' | 'Model X' | 'Model S';
    chargeType: 'CCS2' | 'TPC';
    spec: 'SR' | 'LR' | 'P';
    year: number;
    season: 1 | 2 | 3 | 4;
    carNumber: string;
    carPrice: number;
    sumAssured: number;
    insuranceArray: CarInsurance[];
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
    carInsurancePDF?: Pic;
    status: 'pending' | 'approved' | 'failed';
    ownerId: string;
}

// Car/ListUnordered
export interface CarListUnorderedReq {
    startDate: Date;
    endDate: Date;
}

// File/CarUpload
export interface FileCarUploadReq {
    carId: string;
    docName: string;
    docType:
        | 'vl01'
        | 'vl02'
        | 'car01'
        | 'car02'
        | 'car03'
        | 'car04'
        | 'car05'
        | 'car06'
        | 'car07'
        | 'car08'
        | 'car09'
        | 'carInsurancePDF';
    docContent: string;
    mimeType: string;
}

// File/AvatarUpload
export interface FileAvatarUploadReq {
    docName: string;
    docContent: string;
    mimeType: string;
}

// Order/Create
export interface OrderCreateReq {
    carId: string;
    location: string;
    startDate: Date;
    endDate: Date;
}

// Order/ListMyOrders
// Order/ListRentOrders
export interface OrderListMyOrdersResp {
    orderId: string;
    car: CarListResp;
    user: string;
    location: string;
    startDate: Date;
    endDate: Date;
}
