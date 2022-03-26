import { Component, OnInit } from '@angular/core';
import { AuthLoginResp } from './interfaces/api.model';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
	
	constructor(
		private userService: UserService,
		private apiService: ApiService,
	) {}

	ngOnInit(){
		if(this.userService.currentUser.accessToken){
			this.apiService.UserInfo().subscribe((resp: AuthLoginResp)=>{
				this.userService.currentUser =  { ... resp }
			},
			(err)=>{
				this.userService.currentUser = null;
			})
		}
	}
}
