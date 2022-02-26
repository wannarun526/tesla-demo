
// Auth/Register
export interface AuthRegisterReq{
    account: string;
    password: string;
    name: string;
    cellphone: string;
}



// Auth/Login
export interface AuthLoginReq{
    account: string;
    password: string;
}

export interface AuthLoginResp {
    access_Token: string;
}
