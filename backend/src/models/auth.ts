import { Pic } from './car'

// Auth/Register
export interface AuthRegisterReq {
    custId: string
    password: string
    name: string
    cellphone: string
    email: string
    gender: 'male' | 'female'
    birthdate: Date
    role: 'user' | 'partner'
}

// Auth/Login
export interface AuthLoginReq {
    custId: string
    password: string
    role: 'user' | 'partner'
}

export interface AuthLoginResp {
    userId: string
    accessToken: string
    name: string
    email: string
    cellphone: string
    gender: 'male' | 'female'
    role: {
        admin: boolean
        user: boolean
        partner: boolean
    }
    birthdate: Date
    custId: string
    createdAt: Date
    avatar: Pic
}

// Auth/SendOtp
export interface AuthSendOtpReq {
    custId: string
    cellphone: string
    role: 'user' | 'partner'
}

export interface AuthSendOtpResp {
    sendTime: Date
    name: string | null
    email: string | null
    gender: 'male' | 'female' | null
    birthdate: Date | null
}

// Auth/VerifyOtp
export interface AuthVerifyOtpReq {
    cellphone: string
    verifyCode: string
}

// Auth/ResetPwd
export interface AuthResetPwdReq {
    oldPassword: string
    newPassword: string
}

// Auth/ForgetPwd
export interface AuthForgetPwdReq {
    custId: string
    email: string
}

// Auth/UpdateUser
export interface AuthUpdateUserReq {
    name: string
    gender: 'male' | 'female'
    cellphone: string
    email: string
    birthdate: Date
}

// Auth/AllUsers
export interface AuthAllUsersReq {
    role: 'user' | 'partner' | 'admin'
}
