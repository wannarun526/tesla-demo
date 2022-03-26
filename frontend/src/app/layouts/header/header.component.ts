import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterTypeDialog } from 'src/app/dialogs/registerType/registerType.dialog';
import { User, UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{

	user: User = null;

    constructor(
        private dialog: MatDialog,
	    private router: Router,
        private userService: UserService,
    ) {}

	ngOnInit(){
		this.userService.userChange.subscribe((user: User) =>{
			this.user = user;
			if(!user || !user.accessToken){
				this.router.navigate([""]);
			}
		})
	}

    onShowTypeDialog(){
        const typeDialog = this.dialog.open(RegisterTypeDialog)

        typeDialog.afterClosed().subscribe((type: 'user' | 'partner') => {
            type && this.router.navigate(['register', type]);
        });
    }

    onLogout(){
		this.userService.currentUser = null;
		this.router.navigate(["/"]);
	}
}
