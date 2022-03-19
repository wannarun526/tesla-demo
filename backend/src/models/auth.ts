
// Auth/Register
export interface AuthRegisterReq{
    custId: string;
    password: string;
    name: string;
    cellphone: string;
    email: string;
    gender: "male" | "female";
    birthdate: Date;
    role: "user" | "partner";
}

// Auth/Login
export interface AuthLoginReq{
    custId: string;
    password: string;
}

export interface AuthLoginResp {
    accessToken: string;
    name: string;
    email: string;
    cellphone: string;
    gender: 'male' | 'female';
    role: 'user' | 'partner';
    birthdate: Date;
    custId: string;
}

// Auth/SendOtp
export interface AuthSendOtpReq{
    cellphone: string;
}

export interface AuthSendOtpResp{
    sendTime: Date;
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
