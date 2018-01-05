import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IcurrentUser } from '../shared/models/icurrent-user';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor (private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const  result: boolean = !!localStorage.getItem('currentUser');
      if (result) {
        const currentUser: IcurrentUser = JSON.parse(localStorage.getItem('currentUser'));
        this._router.navigate(['/dashboard/', currentUser.auth_token]);
        return false;
      }
  }
}
