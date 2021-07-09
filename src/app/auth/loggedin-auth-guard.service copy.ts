import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class LoggedInAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (!user) {

      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }

  
}