import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IcurrentUser } from '../shared/models/icurrent-user';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor (private _authService: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.loggedIn) {
        const userProfile: IcurrentUser = this._authService.userProfile;
        this._router.navigate(['/dashboard/', userProfile.auth_token]);
        return false;
      }
      return true;
  }

}
