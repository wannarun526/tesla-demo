import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthLoginResp, Pic } from '../interfaces/api.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    /* UserInfo */
    private userId: string;
    private accessToken: string;
    private name: string;
    private email: string;
    private cellphone: string;
    private gender: 'male' | 'female';
    private role: {
        admin: boolean;
        user: boolean;
        partner: boolean;
    };
    private birthdate: Date;
    private custId: string;
    private createdAt: Date;
    private avatar: Pic;
    private approved: boolean;

    userChange: Subject<AuthLoginResp> = new Subject<AuthLoginResp>();

    get currentUser(): AuthLoginResp {
        return {
            userId: this.userId,
            accessToken: isPlatformBrowser(this.platformId)
                ? localStorage.getItem('funtesla_token')
                : null,
            name: this.name,
            email: this.email,
            cellphone: this.cellphone,
            gender: this.gender,
            role: this.role,
            birthdate: this.birthdate,
            custId: this.custId,
            createdAt: this.createdAt,
            avatar: this.avatar,
            approved: this.approved,
        };
    }

    set currentUser(user: AuthLoginResp) {
        this.userId = user?.userId ? user.userId : null;
        this.name = user?.name ? user.name : null;
        this.email = user?.email ? user.email : null;
        this.cellphone = user?.cellphone ? user.cellphone : null;
        this.gender = user?.gender ? user.gender : null;
        this.role = user?.role ? user.role : null;
        this.birthdate = user?.birthdate ? user.birthdate : null;
        this.custId = user?.custId ? user.custId : null;
        this.approved = user?.approved;
        this.createdAt = user?.createdAt ? user.createdAt : null;
        if (user?.accessToken && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('funtesla_token', user.accessToken);
        } else {
            localStorage.removeItem('funtesla_token');
        }

        this.avatar = user?.avatar ? user.avatar : null;

        this.userChange.next(this.currentUser);
    }
}
