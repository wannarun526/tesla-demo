import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    orderForm: FormGroup;

    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private router: Router,
    ) {}

    ngOnInit() {
        this.orderForm = new FormGroup({
            location: new FormControl(null, [Validators.required]),
            startDate: new FormControl(null, [Validators.required]),
            startTime: new FormControl(null, [Validators.required]),
            endDate: new FormControl(null, [Validators.required]),
            endTime: new FormControl(null, [Validators.required]),
        });
    }

    onSubmitOrder(){

        if(!this.userService.currentUser?.accessToken){
            return this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { line1: "您尚未登入", line2: "請重新操作" }
            })
        }

        if(!this.userService.currentUser.role.user){
            return this.dialog.open(BasicInfoDialog, { 
                width: '60%',
                maxWidth: '500px',
                data: { line1: "您尚未註冊租車用戶帳號", line2: "請重新操作" }
            })
        }
        
        if(this.orderForm.valid){
            const state = { 
                location: this.orderForm.value.location,
                startDate: `${this.orderForm.value.startDate?.format("YYYY/MM/DD")} ${this.orderForm.value.startTime}` ,
                endDate: `${this.orderForm.value.endDate?.format("YYYY/MM/DD")} ${this.orderForm.value.endTime}` ,
            };
            return this.router.navigate(["booking"], { state: { bookState: state } })
        }
    }
}
