import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User, UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { CarListResp, OrderCreateReq } from 'src/app/interfaces/api.model';
import { BookingState } from '../booking/booking.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
    state: BookingState;
    selectedCar: CarListResp;
    user: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private apiService: ApiService,
        private utilService: UtilService,
        private dialog: MatDialog
    ) {
        const inputState = this.router.getCurrentNavigation().extras.state;
        this.state = inputState?.bookState;
        this.selectedCar = inputState?.selectedCar;
    }

    ngOnInit(): void {
        if (!this.state || !this.selectedCar) {
            this.router.navigate(['/']);
            return;
        }
        this.user = this.userService.currentUser;
        this.onGetPageImg();
    }

    onPrevPage(): void {
        this.router.navigate(['booking'], {
            state: { bookState: this.state, selectedCar: this.selectedCar },
        });
    }

    onSubmit(): void {
        const req: OrderCreateReq = {
            carId: this.selectedCar.id,
            location: this.state.location,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        this.apiService.OrderCreate(req).subscribe(
            () => {
                this.router.navigate(['bookingDone'], {
                    state: {
                        bookState: this.state,
                        selectedCar: this.selectedCar,
                    },
                });
            },
            (error: HttpErrorResponse) => {
                this.dialog.open(BasicInfoDialog, {
                    width: '60%',
                    maxWidth: '500px',
                    data: {
                        line1: error.error.errorMsg || error.message,
                        line2: '請重新操作',
                    },
                });
            }
        );
    }

    onGetPageImg(): void {
        Object.keys(this.selectedCar)
            .filter(
                (key) =>
                    this.selectedCar[key]?.docPath &&
                    !this.selectedCar[key]?.base64
            )
            .forEach(async (key) => {
                this.selectedCar[key].base64 =
                    await this.utilService.createImageFromBlob(
                        this.selectedCar[key].docPath,
                        this.selectedCar.ownerId
                    );
            });
    }
}
