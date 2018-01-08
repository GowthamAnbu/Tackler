import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IcurrentUser } from '../shared/models/icurrent-user';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (private _authService: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._authService.loggedIn) {
        this._router.navigateByUrl('/login');
        return false;
      }
      return true;
  }
}
