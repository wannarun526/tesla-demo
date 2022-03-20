import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoint, ApiModel, AuthLoginResp, AuthRegisterReq, AuthSendOtpReq, AuthSendOtpResp, AuthVerifyOtpReq, UploadDocumentReq } from '../interfaces/api.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ApiService {
    
    private baseUrl: string = environment.baseUrl;

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

    AuthRegister(req: AuthRegisterReq): Observable<AuthLoginResp> {
        return this.HttpHandle<AuthLoginResp>(
            this.http.post<ApiModel<AuthLoginResp>>(this.baseUrl + ApiEndpoint.AuthRegister, req),
        );
    }

    AuthSendOtp(req: AuthSendOtpReq): Observable<AuthSendOtpResp> {
        return this.HttpHandle<AuthSendOtpResp>(
            this.http.post<ApiModel<AuthSendOtpResp>>(this.baseUrl + ApiEndpoint.AuthSendOtp, req),
        );
    }

    AuthVerifyOtp(req: AuthVerifyOtpReq): Observable<void> {
        return this.HttpHandle<void>(
            this.http.post<ApiModel<void>>(this.baseUrl + ApiEndpoint.AuthVerifyOtp, req),
        );
    }

    UploadDoc(req: UploadDocumentReq): Observable<void> {
        return this.HttpHandle<void>(
            this.http.post<ApiModel<void>>(this.baseUrl + ApiEndpoint.UploadDocument, req),
        );
    }
}
