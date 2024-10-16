import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue
        if (user && sessionStorage.getItem('user')) {
            return true;
        }
        else {
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }
}