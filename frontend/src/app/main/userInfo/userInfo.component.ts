import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, pipe } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';
import { FailedReasonDialog } from 'src/app/dialogs/failedReason/failedReason.dialog';
import { VehicleLicenseDialog } from 'src/app/dialogs/vehicleLicense/vehicleLicense.dialog';
import { AuthResetPwdReq, AuthUpdateUserReq, CarListResp, CarPic } from 'src/app/interfaces/api.model';
import { DATE_FORMATS } from 'src/app/interfaces/date.model';
import { ApiService } from 'src/app/services/api.service';
import { User, UserService } from 'src/app/services/user.service';
import { cellphoneRule, emailRule, UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-userInfo',
    templateUrl: './userInfo.component.html',
    providers: [
        {   provide: MAT_DATE_FORMATS, 
            useValue: { 
                parse: { ...DATE_FORMATS.parse },
                display: { 
                    ...DATE_FORMATS.display,
                    dateInput: 'YYYY.MM.DD',
                }, 
            } 
        },
    ],
})
export class UserInfoComponent implements OnInit{

    userEditing: boolean = false;
    userInfoForm: FormGroup;
    resetPwdForm: FormGroup;
    role = { user: false, partner: false };
    carIndex: number = 0;
    carInfo: Array<CarListResp> = [];

    constructor(
        private userService: UserService,
        private utilService: UtilService,
        private apiService: ApiService,
        private dialog: MatDialog,
    ) {}

	ngOnInit(){
        this.role = this.userService.currentUser.role;
        this.userInfoForm = new FormGroup({
            "createdAt": new FormControl(this.userService.currentUser.createdAt, [Validators.required]),
            "name": new FormControl(this.userService.currentUser.name, [Validators.required]),
            "gender": new FormControl(this.userService.currentUser.gender, [Validators.required]),
            "custId": new FormControl(this.userService.currentUser.custId, [Validators.required, this.utilService.checkTwID()]),
            "cellphone": new FormControl(this.userService.currentUser.cellphone, [Validators.required, Validators.pattern(cellphoneRule)]),
            "email": new FormControl(this.userService.currentUser.email, [Validators.required, Validators.email, Validators.pattern(emailRule)]),
            "birthdate": new FormControl(this.userService.currentUser.birthdate, [Validators.required]),
        });

        this.resetPwdForm = new FormGroup({
            "oldPassword": new FormControl(null, [Validators.required]),
            "newPassword": new FormControl(null, [Validators.required]),
            "confirmPwd": new FormControl(null, [Validators.required, this.utilService.pwdMatch("newPassword")]),
        })

        this.userService.userChange
        .subscribe((newUser: User)=>{
            this.userInfoForm.patchValue({
                createdAt: newUser.createdAt,
                name: newUser.name,
                gender: newUser.gender,
                custId: newUser.custId,
                cellphone: newUser.cellphone,
                email: newUser.email,
                birthdate: newUser.birthdate,
            })
            this.role = newUser.role;
        },
        (error: HttpErrorResponse) => {
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { line1: error.error.errorMsg || error.message, line2: "請重新操作" }
            })
        })

        this.apiService.CarList()
        .subscribe(async (resp: CarListResp[]) => {
            this.carInfo = resp;
            this.carInfo[this.carIndex] && this.onGetPageImg();

            console.log(this.carInfo);
        }),
        (error: HttpErrorResponse) => {
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { line1: error.error.errorMsg || error.message, line2: "請重新操作" }
            })
        }
	}

    onChangeUserInfo(){
        const req: AuthUpdateUserReq ={
            name: this.userInfoForm.value.name,
            gender: this.userInfoForm.value.gender,
            cellphone: this.userInfoForm.value.cellphone,
            email: this.userInfoForm.value.email,
            birthdate: this.userInfoForm.value.birthdate,
        }

        this.apiService.AuthUpdateUser(req)
        .subscribe(() =>{
            this.userEditing = false;
        },
        (error: HttpErrorResponse) => {
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { line1: error.error.errorMsg || error.message, line2: "請重新操作" }
            })
        })
    }

    onResetPwd(){

        const req: AuthResetPwdReq = {
            oldPassword: this.resetPwdForm.value.oldPassword,
            newPassword: this.resetPwdForm.value.newPassword,
        }
        this.apiService.AuthResetPwd(req)
        .subscribe(() => {
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { line1: "已修改您的密碼", line2: null }
            })
        },
        (error: HttpErrorResponse) => {
            this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { line1: error.error.errorMsg || error.message, line2: "請重新操作" }
            })
        })
    }

    onGetPageImg(){
        Object.keys(this.carInfo[this.carIndex])
            .filter(key => this.carInfo[this.carIndex][key]?.docPath && !this.carInfo[this.carIndex][key]?.base64)
            .forEach(async key => {
                this.carInfo[this.carIndex][key].base64 = await this.utilService.createImageFromBlob(this.carInfo[this.carIndex][key].docPath);
            });
    }

    onChangeTesla(index: number){
        this.carIndex = index;
        this.onGetPageImg();
    }

    onOpenVLDialog(){
        this.dialog.open(VehicleLicenseDialog, {
            width: "90%",
            data: { vl01: this.carInfo[this.carIndex].vl01.base64, vl02: this.carInfo[this.carIndex].vl02.base64 }
        })
    }

    onOpenFailedReasonDialog(){
        this.dialog.open(FailedReasonDialog, {
            width: "50%",
            data: "審核失敗"
        })
    }
}
