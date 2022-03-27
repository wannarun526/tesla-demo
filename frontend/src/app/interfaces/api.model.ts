export enum ApiEndpoint{
    // Auth
	AuthRegister = "/Auth/Register",
	AuthLogin = "/Auth/Login",
    AuthSendOtp = "/Auth/SendOtp",
    AuthVerifyOtp = "/Auth/VerifyOtp",
    AuthResetPwd = "/Auth/ResetPwd",
    AuthForgetPwd = "/Auth/ForgetPwd",
    AuthUserInfo = "/Auth/UserInfo",

    // Upload
    UploadDocument = "/Upload/Document",

}

export interface ApiModel<T>{
    errorMsg: string;
    data: T
}

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
    role: {
        user: boolean;
        partner: boolean;
    };
    birthdate: Date;
    custId: string;
}

// Auth/SendOtp
export interface AuthSendOtpReq{
    custId: string;
    cellphone: string;
    role: "user" | "partner";
}

export interface AuthSendOtpResp{
    sendTime: Date;
    custId: string | null;
    name: string | null;
    email: string | null;
    gender: "male" | "female" | null;
    birthdate: Date | null;
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

// Upload/Document
export interface UploadDocumentReq{
    docName: string;
    docType: "id01" | "id02" | "dl01" | "dl02";
    docContent: string;
}
