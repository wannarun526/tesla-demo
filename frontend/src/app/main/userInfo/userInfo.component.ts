import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BasicInfoDialog } from 'src/app/dialogs/basicInfo/basicInfo.dialog';
import { FailedReasonDialog } from 'src/app/dialogs/failedReason/failedReason.dialog';
import { VehicleLicenseDialog } from 'src/app/dialogs/vehicleLicense/vehicleLicense.dialog';
import {
    AuthResetPwdReq,
    AuthUpdateUserReq,
    CarListResp,
    FileAvatarUploadReq,
    OrderListMyOrdersResp,
    Pic,
} from 'src/app/interfaces/api.model';
import { DATE_FORMATS } from 'src/app/interfaces/date.model';
import { ApiService } from 'src/app/services/api.service';
import { User, UserService } from 'src/app/services/user.service';
import {
    cellphoneRule,
    emailRule,
    UtilService,
} from 'src/app/services/util.service';
import * as moment from 'moment';

@Component({
    selector: 'app-userInfo',
    templateUrl: './userInfo.component.html',
    styleUrls: ['./userInfo.component.css'],
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: { ...DATE_FORMATS.parse },
                display: {
                    ...DATE_FORMATS.display,
                    dateInput: 'YYYY.MM.DD',
                },
            },
        },
    ],
    encapsulation: ViewEncapsulation.None,
})
export class UserInfoComponent implements OnInit {
    userEditing = false;
    userInfoForm: FormGroup;
    originalUserInfo: {
        createdAt: Date;
        name: string;
        gender: 'male' | 'female';
        custId: string;
        cellphone: string;
        email: string;
        birthdate: Date;
    };
    resetPwdForm: FormGroup;
    role = { user: false, partner: false };
    avatar: Pic;
    carIndex = 0;
    carInfo: Array<CarListResp> = [];
    ordersHistory: Array<OrderListMyOrdersResp> = [];
    ordersHistoryId = 0;
    ordersNotYet: Array<OrderListMyOrdersResp> = [];
    ordersNotYetId = 0;

    constructor(
        private userService: UserService,
        private utilService: UtilService,
        private apiService: ApiService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userInfoForm = new FormGroup({
            createdAt: new FormControl(this.userService.currentUser.createdAt, [
                Validators.required,
            ]),
            name: new FormControl(this.userService.currentUser.name, [
                Validators.required,
            ]),
            gender: new FormControl(this.userService.currentUser.gender, [
                Validators.required,
            ]),
            custId: new FormControl(this.userService.currentUser.custId, [
                Validators.required,
                this.utilService.checkTwID(),
            ]),
            cellphone: new FormControl(this.userService.currentUser.cellphone, [
                Validators.required,
                Validators.pattern(cellphoneRule),
            ]),
            email: new FormControl(this.userService.currentUser.email, [
                Validators.required,
                Validators.email,
                Validators.pattern(emailRule),
            ]),
            birthdate: new FormControl(this.userService.currentUser.birthdate, [
                Validators.required,
            ]),
        });

        this.resetPwdForm = new FormGroup({
            oldPassword: new FormControl(null, [Validators.required]),
            newPassword: new FormControl(null, [Validators.required]),
            confirmPwd: new FormControl(null, [
                Validators.required,
                this.utilService.pwdMatch('newPassword'),
            ]),
        });

        this.onSetupUser(this.userService.currentUser);
        this.userService.userChange.subscribe(
            (newUser: User) => {
                this.onSetupUser(newUser);
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

        this.apiService.CarList().subscribe(
            async (resp: CarListResp[]) => {
                this.carInfo = resp;
                if (this.carInfo[this.carIndex]) {
                    this.onGetPageImg();
                }
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

        this.apiService
            .OrderListMyOrders()
            .subscribe((resp: OrderListMyOrdersResp[]) => {
                this.ordersHistory = resp.filter(
                    (order: OrderListMyOrdersResp) =>
                        moment(order.endDate).isBefore(moment())
                );

                this.ordersNotYet = resp.filter(
                    (order: OrderListMyOrdersResp) =>
                        moment(order.endDate).isSameOrAfter(moment())
                );

                console.log(this.ordersNotYet);
                console.log(this.ordersNotYetId);
            });
    }

    onChangeUserInfo(): void {
        const req: AuthUpdateUserReq = {
            name: this.userInfoForm.value.name,
            gender: this.userInfoForm.value.gender,
            cellphone: this.userInfoForm.value.cellphone,
            email: this.userInfoForm.value.email,
            birthdate: this.userInfoForm.value.birthdate,
        };

        this.apiService.AuthUpdateUser(req).subscribe(
            () => {
                this.userEditing = false;
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

    onResetPwd(): void {
        const req: AuthResetPwdReq = {
            oldPassword: this.resetPwdForm.value.oldPassword,
            newPassword: this.resetPwdForm.value.newPassword,
        };
        this.apiService.AuthResetPwd(req).subscribe(
            () => {
                this.dialog.open(BasicInfoDialog, {
                    width: '60%',
                    maxWidth: '500px',
                    data: { line1: '已修改您的密碼', line2: null },
                });
                this.router.navigate(['']);
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
        Object.keys(this.carInfo[this.carIndex])
            .filter(
                (key) =>
                    this.carInfo[this.carIndex][key]?.docPath &&
                    !this.carInfo[this.carIndex][key]?.base64
            )
            .forEach(async (key) => {
                this.carInfo[this.carIndex][key].base64 =
                    await this.utilService.createImageFromBlob(
                        this.carInfo[this.carIndex][key].docPath,
                        this.carInfo[this.carIndex].ownerId
                    );
            });
    }

    onChangeTesla(index: number): void {
        this.carIndex = index;
        this.onGetPageImg();
    }

    onOpenVLDialog(): void {
        this.dialog.open(VehicleLicenseDialog, {
            width: '90%',
            data: {
                vl01: this.carInfo[this.carIndex].vl01.base64,
                vl02: this.carInfo[this.carIndex].vl02.base64,
            },
        });
    }

    onOpenFailedReasonDialog(): void {
        this.dialog.open(FailedReasonDialog, {
            width: '50%',
            data: '審核失敗',
        });
    }

    onEditUserInfo(): void {
        if (this.userEditing) {
            this.userEditing = false;
            this.userInfoForm.patchValue(this.originalUserInfo);
        } else {
            this.userEditing = true;
            this.originalUserInfo = this.userInfoForm.value;
        }
    }

    onCalendarIsSelected(event: any): string {
        const date = moment(event);

        const daysSelected = [
            moment().add(-5, 'd'),
            moment().add(-3, 'd'),
            moment().add(3, 'd'),
            moment().add(5, 'd'),
        ];

        const result = daysSelected?.find((x) => x.isSame(date, 'date'))
            ? 'selected'
            : null;

        return result;
    }

    async onUploadAvatar(file: File): Promise<void> {
        const content = await this.utilService.onFileToBase64(file);
        const base64 = content?.split('base64,');
        const req: FileAvatarUploadReq = {
            docContent: base64[1],
            docName: file.name,
            mimeType: base64[0],
        };
        this.apiService.FileAvatarUpload(req).subscribe(
            (res: Pic) => {
                this.avatar = { ...res, base64: content };
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

    private async onSetupUser(inputUser: User): Promise<void> {
        this.userInfoForm.patchValue({
            createdAt: inputUser.createdAt,
            name: inputUser.name,
            gender: inputUser.gender,
            custId: inputUser.custId,
            cellphone: inputUser.cellphone,
            email: inputUser.email,
            birthdate: inputUser.birthdate,
        });
        this.role = inputUser.role;
        this.avatar = inputUser.avatar;
        if (this.avatar?.docPath && !this.avatar.base64) {
            this.avatar.base64 = await this.utilService.createImageFromBlob(
                this.avatar.docPath,
                this.userService.currentUser.userId
            );
        }
    }
}
