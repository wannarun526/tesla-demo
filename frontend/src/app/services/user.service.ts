import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
        }
    }

    set currentUser(user: User){
        this.name = user && user.name ? user.name : null;
        this.email = user && user.email ? user.email : null;
        this.cellphone = user && user.cellphone ? user.cellphone : null;
        this.gender = user && user.gender ? user.gender : null;
        this.role = user && user.role ? user.role : null;
        this.birthdate = user && user.birthdate ? user.birthdate : null;
        this.custId = user && user.custId ? user.custId : null;
        this.createdAt = user && user.createdAt ? user.createdAt : null;
        if(user && user.accessToken && isPlatformBrowser(this.platformId)){
            localStorage.setItem("funtesla_token", user.accessToken)
        }else{
            localStorage.removeItem("funtesla_token");
        }

        this.userChange.next(this.currentUser);
    }

}
