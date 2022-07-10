import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterTypeDialog } from 'src/app/dialogs/registerType/registerType.dialog';
import { AuthLoginResp } from 'src/app/interfaces/api.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    user: AuthLoginResp = null;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.userChange.subscribe((user: AuthLoginResp) => {
            this.user = user;
            if (!user || !user.accessToken) {
                this.router.navigate(['']);
            }
        });
    }

    onShowTypeDialog(): void {
        const typeDialog = this.dialog.open(RegisterTypeDialog);

        typeDialog.afterClosed().subscribe((type: 'user' | 'partner') => {
            if (type) {
                this.router.navigate(['register', type]);
            }
        });
    }

    onLogout(): void {
        this.userService.currentUser = null;
        this.router.navigate(['/']);
    }

    onGoManagePage(): void {
        if (this.userService.currentUser.role.admin) {
            this.router.navigate(['schedule']);
        } else {
            this.router.navigate(['userInfo']);
        }
    }
}
