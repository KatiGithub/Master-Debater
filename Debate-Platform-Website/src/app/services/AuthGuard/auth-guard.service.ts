import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.auth.isActivated()
    .then((data)=>
      { return true; })
    .catch((err: HttpErrorResponse)=>
      { 
        console.log(err);
        return false;
      })
    this.auth.logout();
    return false;
    }
  }