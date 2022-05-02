import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('autenticacion_token')) {
      // logged in so return true
      return true;
    }

    // navigate to login page
    // this._router.navigate(['/inicio'], { queryParams: { returnUrl: state.url }});
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
