import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginResp } from 'src/app/interfaces/api.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-bookingDone',
    templateUrl: './bookingDone.component.html',
})
export class BookingDoneComponent implements OnInit {

    user: AuthLoginResp;

    constructor(
        private userService: UserService,
        private router: Router,
    ) {
        const inputState = this.router.getCurrentNavigation().extras.state;
        if(!inputState?.bookState || !inputState?.selectedCar){
            this.router.navigate(["/"])
        }
    }

    ngOnInit() {
        this.user = this.userService.currentUser;
    }
}
