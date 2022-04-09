import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoint, ApiModel, AuthLoginReq, AuthLoginResp, AuthRegisterReq, AuthSendOtpReq, AuthSendOtpResp, AuthVerifyOtpReq, AuthForgetPwdReq, AuthUpdateUserReq, FileCarUploadReq, AuthResetPwdReq, CarCreateReq, CarCreateResp, CarListResp } from '../interfaces/api.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ApiService {
    
    private baseUrl: string = environment.baseUrl;
    private apiUrl: string = environment.baseUrl + "/api";

    constructor(private http: HttpClient) { }

    private HttpHandle<T2>(method: Observable<ApiModel<T2>>): Observable<T2>{
        return method.pipe(
            map((apiResp: ApiModel<T2>)=>{
                
                if(apiResp.errorMsg != "0000"){
                    throw new HttpErrorResponse({
                        error: { details: apiResp.errorMsg }
                    });
                }
                return apiResp.data;
            })
        )
    }

    AuthRegister(req: AuthRegisterReq): Observable<void> {
        return this.HttpHandle<void>(
            this.http.post<ApiModel<void>>(this.apiUrl + ApiEndpoint.AuthRegister, req),
        );
    }

    AuthSendOtp(req: AuthSendOtpReq): Observable<AuthSendOtpResp> {
        return this.HttpHandle<AuthSendOtpResp>(
            this.http.post<ApiModel<AuthSendOtpResp>>(this.apiUrl + ApiEndpoint.AuthSendOtp, req),
        );
    }

    AuthVerifyOtp(req: AuthVerifyOtpReq): Observable<void> {
        return this.HttpHandle<void>(
            this.http.post<ApiModel<void>>(this.apiUrl + ApiEndpoint.AuthVerifyOtp, req),
        );
    }

    AuthLogin(req: AuthLoginReq): Observable<AuthLoginResp>{
        return this.HttpHandle<AuthLoginResp>(
            this.http.post<ApiModel<AuthLoginResp>>(this.apiUrl + ApiEndpoint.AuthLogin, req),
        );
    }

    AuthResetPwd(req: AuthResetPwdReq): Observable<void>{
        return this.HttpHandle<void>(
            this.http.post<ApiModel<void>>(this.apiUrl + ApiEndpoint.AuthResetPwd, req),
        );
    }

    AuthForgetPwd(req: AuthForgetPwdReq): Observable<void>{
        return this.HttpHandle<void>(
            this.http.post<ApiModel<void>>(this.apiUrl + ApiEndpoint.AuthForgetPwd, req),
        );
    }

    AuthUserInfo(): Observable<AuthLoginResp>{
        return this.HttpHandle<AuthLoginResp>(
            this.http.post<ApiModel<AuthLoginResp>>(this.apiUrl + ApiEndpoint.AuthUserInfo, null),
        );
    }

    AuthUpdateUser(req: AuthUpdateUserReq): Observable<null>{
        return this.HttpHandle<null>(
            this.http.post<ApiModel<null>>(this.apiUrl + ApiEndpoint.AuthUpdateUser, req),
        );
    }

    CarCreate(req: CarCreateReq): Observable<CarCreateResp>{
        return this.HttpHandle<CarCreateResp>(
            this.http.post<ApiModel<CarCreateResp>>(this.apiUrl + ApiEndpoint.CarCreate, req),
        );
    }

    CarList(): Observable<Array<CarListResp>>{
        return this.HttpHandle<Array<CarListResp>>(
            this.http.post<ApiModel<Array<CarListResp>>>(this.apiUrl + ApiEndpoint.CarList, null),
        );
    }

    FileCarUpload(req: FileCarUploadReq): Observable<void> {
        return this.HttpHandle<void>(
            this.http.post<ApiModel<void>>(this.apiUrl + ApiEndpoint.FileCarUpload, req),
        );
    }

    GetFile(path: string) : Observable<Blob>{
        return this.http.get<Blob>
        (
            `${this.baseUrl}/${path}`,
            { responseType: 'blob' as 'json'}
        )
    }
}
