import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    AuthLoginResp,
    CarAuditApproveReq,
    CarAuditRejectReq,
    CarListResp,
} from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';

interface NewCar extends CarListResp {
    rentPrice: number;
    rejectReason: string;
}
@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit {
    tabId = 0;
    // 會員資訊
    allUsers: AuthLoginResp[];
    // 夥伴資訊
    allPartners: AuthLoginResp[];
    // 新車資訊
    allNewCars: NewCar[];

    constructor(
        private apiService: ApiService,
        private utilService: UtilService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.apiService
            .AuthAllUsers({ role: 'user' })
            .subscribe(async (resp: AuthLoginResp[]) => {
                this.allUsers = await Promise.all(
                    resp.map(async (user: AuthLoginResp) => {
                        if (user.avatar.docPath && !user.avatar.base64) {
                            user.avatar.base64 =
                                await this.utilService.createImageFromBlob(
                                    user.avatar.docPath,
                                    user.userId
                                );
                        }
                        return user;
                    })
                );
            });

        this.apiService
            .AuthAllUsers({ role: 'partner' })
            .subscribe(async (resp: AuthLoginResp[]) => {
                this.allPartners = await Promise.all(
                    resp.map(async (user: AuthLoginResp) => {
                        if (user.avatar.docPath && !user.avatar.base64) {
                            user.avatar.base64 =
                                await this.utilService.createImageFromBlob(
                                    user.avatar.docPath,
                                    user.userId
                                );
                        }
                        return user;
                    })
                );
            });

        this.onGetPendingCard();
    }

    onGetPendingCard(): void {
        this.apiService.CarListPendings().subscribe((resp: CarListResp[]) => {
            this.allNewCars = resp.map((car: CarListResp) => {
                Object.keys(car)
                    .filter((key) => car[key]?.docPath && !car[key]?.base64)
                    .forEach(async (key) => {
                        car[key].base64 =
                            await this.utilService.createImageFromBlob(
                                car[key].docPath,
                                car.owner.id
                            );
                    });
                return { ...car, rentPrice: null, rejectReason: null };
            });
        });
    }

    onApproveNewCar(car: NewCar): void {
        const req: CarAuditApproveReq = {
            carId: car.id,
            rentPrice: Number(car.rentPrice),
        };

        this.apiService.CarAuditApprove(req).subscribe(
            () => {
                this.onGetPendingCard();
            },
            (error: HttpErrorResponse) => {
                this.dialog.open(BasicInfoDialog, {
                    width: '60%',
                    maxWidth: '500px',
                    data: { line1: error.error.errorMsg, line2: '請重新操作' },
                });
            }
        );
    }

    onRejectNewCar(car: NewCar): void {
        const req: CarAuditRejectReq = {
            carId: car.id,
            rejectReason: car.rejectReason,
        };

        this.apiService.CarAuditReject(req).subscribe(
            () => {
                this.onGetPendingCard();
            },
            (error: HttpErrorResponse) => {
                this.dialog.open(BasicInfoDialog, {
                    width: '60%',
                    maxWidth: '500px',
                    data: { line1: error.error.errorMsg, line2: '請重新操作' },
                });
            }
        );
    }
}
