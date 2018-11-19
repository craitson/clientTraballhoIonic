import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, public jwtHelper: JwtHelperService) { }

  // recebe o token do jwt com validade de 1 hora

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('access_token')) {
        if (this.jwtHelper.isTokenExpired()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
