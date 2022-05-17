import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthForgetPwdReq } from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { emailRule, UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'dialog-forgetPwd',
    templateUrl: 'forgetPwd.dialog.html',
})
export class ForgetPwdDialog implements OnInit{

    form: FormGroup;

  	constructor(
        private dialogRef: MatDialogRef<ForgetPwdDialog>,
        private utilService: UtilService,
        private apiService: ApiService,
    ) {}

    ngOnInit() {
        
        this.form = new FormGroup({
            "custId": new FormControl(null, [Validators.required, this.utilService.checkTwID()]),
            "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern(emailRule)]),
        })
    }

    onClose(){
        this.dialogRef.close();
    }

    onSubmit(){
        if(this.form.invalid){
            return;
        }
        const req: AuthForgetPwdReq = { 
            custId: this.form.value.custId,
            email: this.form.value.email,
        }
        this.apiService.AuthForgetPwd(req)
        .subscribe(() => {
            this.dialogRef.close({ success: true, message: "新密碼已寄至註冊信箱" })
        },
        (error: HttpErrorResponse) =>{
            this.dialogRef.close({ success: false, message: error.error.errorMsg || error.message  })
        })
    }
}
