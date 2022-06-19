import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ChooseCarDialogComponent } from 'src/app/dialogs/chooseCar/chooseCar.dialog';
import { CarListResp, CarListUnorderedReq } from 'src/app/interfaces/api.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';

export interface BookingState {
    location: string;
    startDate: Date;
    endDate: Date;
    rentHours: number;
}

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
    state: BookingState;
    carList: CarListResp[];
    selectedCar: CarListResp;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private apiService: ApiService
    ) {
        const inputState = this.router.getCurrentNavigation().extras.state;
        this.state = inputState?.bookState;
        this.selectedCar = inputState?.selectedCar;
    }

    ngOnInit(): void {
        if (!this.state) {
            this.router.navigate(['/']);
            return;
        }

        this.state.startDate = moment(this.state.startDate).toDate();
        this.state.endDate = moment(this.state.endDate).toDate();
        this.state.rentHours = Math.abs(
            moment
                .duration(moment(this.state.startDate).diff(this.state.endDate))
                .asHours()
        );

        const req: CarListUnorderedReq = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        this.apiService.CarListUnordered(req).subscribe(
            (resp: CarListResp[]) => {
                this.carList = resp;
            },
            (error: HttpErrorResponse) => {
                const basicInfoDialog = this.dialog.open(BasicInfoDialog, {
                    width: '60%',
                    maxWidth: '500px',
                    data: {
                        line1: error.error.errorMsg || error.message,
                        line2: '請重新操作',
                    },
                });

                basicInfoDialog.afterClosed().subscribe(() => {
                    this.router.navigate(['/']);
                });
            }
        );
    }

    onOpenChooseCarDialog(): void {
        const chooseCarDialog = this.dialog.open(ChooseCarDialogComponent, {
            width: '90%',
            data: this.carList,
        });

        chooseCarDialog.afterClosed().subscribe((car: CarListResp) => {
            if (car) {
                this.selectedCar = car;
            }
        });
    }

    onSubmit(): void {
        this.router.navigate(['order'], {
            state: { bookState: this.state, selectedCar: this.selectedCar },
        });
    }
}
