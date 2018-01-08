import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public authService: AuthService,
    private _router: Router ) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.logout();
    this._router.navigateByUrl('/login');
    this.snackBar.open('You have Successfully logged out', 'success', {
      duration: 3000,
    });
  }

}
