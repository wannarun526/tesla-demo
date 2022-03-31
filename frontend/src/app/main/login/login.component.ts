import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginReq, AuthLoginResp } from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPwdDialog } from 'src/app/dialogs/forgetPwd/forgetPwd.dialog';
import { UtilService } from 'src/app/services/util.service';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

    formUser: FormGroup;
    formPartner: FormGroup;
    token: string | undefined;

    constructor(
        private apiService: ApiService,
        private userService: UserService,
        private router: Router,
        private dialog: MatDialog,
        private utilService: UtilService,
    ) {}

	ngOnInit(){

        this.formUser = new FormGroup({
            "custId": new FormControl(null, [Validators.required, this.utilService.checkTwID()]),
            "password": new FormControl(null, [Validators.required]),
            "recaptcha": new FormControl(null, [Validators.required]),
            "role": new FormControl("user", [Validators.required]),
        })

        this.formPartner = new FormGroup({
            "custId": new FormControl(null, [Validators.required, this.utilService.checkTwID()]),
            "password": new FormControl(null, [Validators.required]),
            "recaptcha": new FormControl(null, [Validators.required]),
            "role": new FormControl("partner", [Validators.required]),
        })
	}

    onSubmit(form: FormGroup) {
        if (form.invalid) {
            form.markAllAsTouched();
            return;
        }
        
        const req: AuthLoginReq = {
            custId: form.get('custId').value,
            password: form.get('password').value,
            role: form.get('role').value,
        }

        this.apiService.AuthLogin(req)
        .subscribe((response: AuthLoginResp) =>{
            console.log(response);

            this.userService.currentUser = { ...response }
            this.router.navigate(["/"])
        },
        (error: HttpErrorResponse) => {
            this.dialog.open(BasicInfoDialog, {
                data: { line1: error.error.errorMsg || error.message, line2: "請重新操作" }
            });
        })
    }

    onOpenForgetModal(){
        const forgetDialog = this.dialog.open(ForgetPwdDialog, {
            maxWidth: "500px",
        })

        forgetDialog.afterClosed().subscribe(result => {
            result && this.dialog.open(BasicInfoDialog, {
                data: { line1: result.message, line2: result.success ? "請重新登入" : "請重新操作" }
            });
        });
    }
}
