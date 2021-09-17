import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.auth
      .isActivated()
      .then((data) => {
        console.log('permission passed (authguard)');
        return true;
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        if (err.error == 'User is not registered') {
          console.log('user not registered, redirecting to signup page');
          this.router.navigate(['signup']);
          return false;
        } else {
          this.auth.logout();
          return false;
        }
      });
    
  }
}
