import { Component, OnInit } from '@angular/core';
import { AuthLoginResp } from 'src/app/interfaces/api.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit {
    tabId = 0;
    // 會員資訊
    allUsers: AuthLoginResp[];
    allPartners: AuthLoginResp[];

    constructor(
        private apiService: ApiService,
        private utilService: UtilService
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
    }
}
