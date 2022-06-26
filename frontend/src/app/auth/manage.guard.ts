import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class ManageGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const jwt: { admin: boolean } = jwt_decode(
            this.userService.currentUser.accessToken
        );
        const path = route.routeConfig.path;

        if (
            (jwt.admin && path === 'schedule') ||
            (!jwt.admin && path !== 'schedule')
        ) {
            return true;
        }
        this.router.navigate([jwt.admin ? 'schedule' : 'userInfo']);
        return false;
    }
}
