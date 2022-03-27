import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthRegisterReq, AuthSendOtpResp } from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit{

    registered: boolean = false;
    title: string;
    step: number = 0;
    formStep0: FormGroup;
    formStep1: FormGroup;
    formStep2: FormGroup;
    otpTimer: any;
    otpSecond: number | null = null;

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog,
        private router: Router,
    ) {}


	ngOnInit(){
        const role = this.router.url.split('/')[2];
        role === "user" && (this.title = "一般會員註冊");
        role === "partner" && (this.title = "租車夥伴註冊");

		const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        const genderRule = /^(?:male|female)$/;
        const roleRule = /^(?:user|partner)$/;
        const cellphoneRule = /^09[0-9]{8}$/;
        const verifyCodeRult = /^[0-9]{6}$/;
        const base64Rule = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

        this.formStep0 = new FormGroup({
            "role": new FormControl(role, [Validators.required, Validators.pattern(roleRule)]),
            "custId": new FormControl(null, [Validators.required, this.checkTwID()]),
            "cellphone": new FormControl(null, [Validators.required, Validators.pattern(cellphoneRule)]),
            "readTerms": new FormControl(false, [Validators.requiredTrue]),
        })

        this.formStep1 = new FormGroup({
            "cellphone": new FormControl(null, [Validators.required, Validators.pattern(cellphoneRule)]),
            "verifyCode": new FormControl(null, [Validators.required, Validators.pattern(verifyCodeRult)]),
        })
        
        this.formStep2 = new FormGroup({
            "role": new FormControl(role, [Validators.required, Validators.pattern(roleRule)]),
            "name": new FormControl(null, [Validators.required]),
            "gender": new FormControl(null, [Validators.required, Validators.pattern(genderRule)]),
            "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern(emailRule)]),
            "cellphone": new FormControl(null, [Validators.required, Validators.pattern(cellphoneRule)]),
            "birthdate": new FormControl(null, [Validators.required]),
            "custId": new FormControl(null, [Validators.required, this.checkTwID()]),
            "password": new FormControl(null, [this.registeredPwd()]),
            "confirmPwd": new FormControl(null, [this.registeredPwd(), this.pwdMatch("password")]),
        })
	}


    onSubmitStep0(finishedThenNext: boolean){
        const { custId, cellphone, role } = this.formStep0.value;

        this.formStep0.valid && 
        this.apiService.AuthSendOtp({
            custId: custId,
            cellphone: cellphone,
            role: role
        }).subscribe((response: AuthSendOtpResp) =>{
            finishedThenNext && (this.step = this.step +1);
            this.otpSecond = moment.duration(moment(response.sendTime).add(5, 'm').diff(new Date())).asSeconds();
            clearInterval(this.otpTimer);
            this.otpTimer = setInterval(() => {
                if(this.otpSecond > 0){
                    this.otpSecond = this.otpSecond - 1;
                }
            }, 1000);

            this.formStep1.patchValue({ 
                cellphone: cellphone,
            })
            this.formStep2.patchValue({
                cellphone: cellphone, 
                custId: custId, 
                name: response.name,
                email: response.email,
                gender: response.gender,
                birthdate: response.birthdate,
            })

            this.registered = 
                response.name && 
                response.email && 
                response.gender && 
                response.birthdate != null;
        },
        (error: HttpErrorResponse) =>{
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: error.error.errorMsg || error.message 
            })
        })
    }

    onSubmitStep1(){
        this.formStep1.valid && 
        this.apiService.AuthVerifyOtp({
            cellphone: this.formStep1.get("cellphone").value,
            verifyCode: this.formStep1.get("verifyCode").value,
        }).subscribe(() =>{
            this.step = this.step +1;
            clearInterval(this.otpTimer)
            this.otpSecond = null;
        },
        (error: HttpErrorResponse) =>{
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: error.error.errorMsg || error.message 
            })
        })
    }

    onSubmitStep2(){

        const req: AuthRegisterReq = {
            custId: this.formStep2.get("custId").value,
            password: this.formStep2.get("password").value || "pass",
            name: this.formStep2.get("name").value,
            cellphone: this.formStep2.get("cellphone").value,
            email: this.formStep2.get("email").value,
            gender: this.formStep2.get("gender").value,
            birthdate: this.formStep2.get("birthdate").value,
            role: this.formStep2.get("role").value,
        };
        this.apiService.AuthRegister(req)
        .subscribe(() =>{ 
            this.step = this.step +1;
        },
        (error: HttpErrorResponse) => {
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: error.error.errorMsg || error.message 
            })
        })
    }

    private pwdMatch = (matchTo: string): (AbstractControl) => ValidationErrors | null => {
        return (control: AbstractControl): ValidationErrors | null => {
            return control && control.parent && control.value === control.parent.value[matchTo] ? null : { isMatching: false }
        };
    }

    private registeredPwd = (): (AbstractControl) => ValidationErrors | null => {
        return (control: AbstractControl): ValidationErrors | null => {
            return control && control.parent && ( (!this.registered && control.value)  || (this.registered && !control.value)) ? null : { isMatching: false }
        };
    }

    private checkTwID = (): (AbstractControl) => ValidationErrors | null => {
        return (control: AbstractControl): ValidationErrors | null => {
            if(control.value){
                //建立字母分數陣列(A~Z)
                const city = new Array(1,10,19,28,37,46,55,64,39,73,82, 2,11,20,48,29,38,47,56,65,74,83,21, 3,12,30)
                var id = control.value.toUpperCase();
                //使用「正規表達式」檢驗格式
                if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
                    return { isMatching: false };
                } else {
                    //將字串分割為陣列(IE必需這麼做才不會出錯)
                    id = id.split('');
                    //計算總分
                    var total = city[id[0].charCodeAt(0)-65];
                    for(var i=1; i<=8; i++){
                        total += eval(id[i]) * (9 - i);
                    }
                    //補上檢查碼(最後一碼)
                    total += eval(id[9]);
                    //檢查比對碼(餘數應為0);
                    return (total%10 == 0) ? null : { isMatching: false };
                }
            }
        };
    }
}
