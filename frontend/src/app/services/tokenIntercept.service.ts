import { Injectable } from '@angular/core';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class TokenIntercept implements HttpInterceptor {
    constructor(
	    private router: Router,
		private userService: UserService,
	) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return from([this.userService.currentUser.accessToken])
		.pipe(switchMap(token => {
			if (token) {
				request = request.clone({
					setHeaders: {
						'Authorization': token
					}
				});
			}

			if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
				request = request.clone({
					setHeaders: {
						'Content-Type': 'application/json'
					}
				});
			}

			request = request.clone({
				headers: request.headers.set('Accept', '*/*')
			});

			return next.handle(request);
		}),

		catchError((error: HttpErrorResponse) => {
			if (error.status === 401) {
	            this.router.navigate(['']);
			}
			return throwError(error);
		}));
    }
}
