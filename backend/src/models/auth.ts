
// Auth/Register
export interface RegisterDocReq{
    docName: string;
    docContent: string;
}
export interface AuthRegisterReq{
    custId: string;
    password: string;
    name: string;
    cellphone: string;
    email: string;
    gender: "Male" | "Female";
    birthdate: Date;
    id01: RegisterDocReq;
    id02: RegisterDocReq;
    dl01: RegisterDocReq;
    dl02: RegisterDocReq;
}

// Auth/Login
export interface AuthLoginReq{
    custId: string;
    password: string;
}

export interface AuthLoginResp {
    access_Token: string;
}

// Auth/SendOtp
export interface AuthSendOtpReq{
    cellphone: string;
}

// Auth/VerifyOtp
export interface AuthVerifyOtpReq{
    cellphone: string;
    verifyCode: string;
}

// Auth/ResetPwd
export interface AuthResetPwdReq{
    oldPassword: string;
    newPassword: string;
}

// Auth/ForgetPwd
export interface AuthForgetPwdReq{
    email: string;
    cellphone: string;
}
