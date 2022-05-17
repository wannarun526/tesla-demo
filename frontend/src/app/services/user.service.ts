import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Pic } from '../interfaces/api.model';

export interface User{
    accessToken: string;
    name: string;
    email: string;
    cellphone: string;
    gender: 'male' | 'female';
    role: {
        user: boolean;
        partner: boolean;
    };
    birthdate: Date;
    custId: string;
    createdAt: Date;
    avatar: Pic;
}

@Injectable({ providedIn: 'root' })
export class UserService{

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
    ) { }
    
    /* UserInfo */
    private accessToken: string;
    private name: string;
    private email: string;
    private cellphone: string;
    private gender: 'male' | 'female';
    private role: { 
        user: boolean;  
        partner: boolean;
    };
    private birthdate: Date;
    private custId: string;
    private createdAt: Date;
    private avatar: Pic;
    
    userChange: Subject<User> = new Subject<User>();

    get currentUser(): User{
        return { 
            accessToken: isPlatformBrowser(this.platformId) ? localStorage.getItem("funtesla_token") : null,
            name: this.name, 
            email: this.email,
            cellphone: this.cellphone,
            gender: this.gender,
            role: this.role,
            birthdate: this.birthdate,
            custId: this.custId,
            createdAt: this.createdAt,
            avatar: this.avatar,
        }
    }

    set currentUser(user: User){
        this.name = user?.name ? user.name : null;
        this.email = user?.email ? user.email : null;
        this.cellphone = user?.cellphone ? user.cellphone : null;
        this.gender = user?.gender ? user.gender : null;
        this.role = user?.role ? user.role : null;
        this.birthdate = user?.birthdate ? user.birthdate : null;
        this.custId = user?.custId ? user.custId : null;
        this.createdAt = user?.createdAt ? user.createdAt : null;
        if(user?.accessToken && isPlatformBrowser(this.platformId)){
            localStorage.setItem("funtesla_token", user.accessToken)
        }else{
            localStorage.removeItem("funtesla_token");
        }

        this.avatar = user?.avatar ? user.avatar : null;

        this.userChange.next(this.currentUser);
    }

}
