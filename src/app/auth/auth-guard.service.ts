import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (user) {
      // if(route.data.roles && route.data.roles.indexOf(user.role) === -1){
      //   this.router.navigate(['']);
      //   return false;
      // }
      // this.router.navigate(['']);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  
}