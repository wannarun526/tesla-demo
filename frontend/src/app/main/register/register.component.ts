import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSendOtpResp } from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'momnet';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit{

    step: number = 0;
    formStep0: FormGroup;
    formStep1: FormGroup;
    otpTimer: any;
    otpSecond: number | null = null;

    constructor(
        private apiService: ApiService,
        public dialog: MatDialog,
    ) {}

	ngOnInit(){

        this.formStep0 = new FormGroup({
            "custId": new FormControl(null, [Validators.required]),
            "cellphone": new FormControl(null, [Validators.required]),
            "readTerms": new FormControl(false, [Validators.requiredTrue]),
        })

        this.formStep1 = new FormGroup({
            "cellphone": new FormControl(null, [Validators.required]),
            "verifyCode": new FormControl(null, [Validators.required]),
        })
	}


    onSubmitStep0(finishedThenNext: boolean){
        this.apiService.AuthSendOtp({
            cellphone: this.formStep0.get("cellphone").value
        }).subscribe((response: AuthSendOtpResp) =>{
            finishedThenNext && (this.step = this.step +1);
            this.otpSecond = moment.duration(moment(response.sendTime).add(5, 'm').diff(new Date())).asSeconds();
            clearInterval(this.otpTimer);
            this.otpTimer = setInterval(() => {
                if(this.otpSecond > 0){
                    this.otpSecond = this.otpSecond - 1;
                }
            }, 1000);
        },
        (error: HttpErrorResponse) =>{
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { info: error.error.errorMsg || error.message } 
            })
        })
    }

    onSubmitStep1(){
        this.apiService.AuthVerifyOtp({
            cellphone: this.formStep1.get("cellphone").value,
            verifyCode: this.formStep1.get("verifyCode").value,
        }).subscribe(() =>{
            this.step = this.step +1;
            clearInterval(this.otpTimer)
            this.otpSecond = null;
        },
        (error: HttpErrorResponse) =>{
            console.log(error)
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { info: error.error.errorMsg || error.message } 
            })
        })
    }
}
