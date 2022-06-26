import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

const whiteListUrl = {
    login: true,
    'register/user': true,
    'register/partner': true,
};

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const user = this.userService.currentUser;
        if (
            route.routeConfig.path === '' ||
            (whiteListUrl[route.routeConfig.path] && !user.accessToken) ||
            (!whiteListUrl[route.routeConfig.path] && user.accessToken)
        ) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
