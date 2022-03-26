import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginReq, AuthLoginResp } from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

    formUser: FormGroup;
    
    token: string | undefined;

    constructor(
        private apiService: ApiService,
        private userService: UserService,
        private router: Router
    ) {}

	ngOnInit(){

        this.formUser = new FormGroup({
            "custId": new FormControl(null, [Validators.required]),
            "password": new FormControl(null, [Validators.required]),
            "recaptcha": new FormControl(null, [Validators.required]),
        })
	}

    onSubmitUser() {
        if (this.formUser.invalid) {
            this.formUser.markAllAsTouched();
            return;
        }
        
        const req: AuthLoginReq = {
            custId: this.formUser.get('custId').value,
            password: this.formUser.get('password').value,
        }

        this.apiService.AuthLogin(req)
        .subscribe((response: AuthLoginResp) =>{
            console.log(response);

            this.userService.currentUser = { ...response }
            this.router.navigate(["/"])
        })
    }
}
