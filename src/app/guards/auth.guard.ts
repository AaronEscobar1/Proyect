import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Helpers } from '../shared/helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private helpers: Helpers,
              private authService: AuthService,
              private router: Router) {}

  canActivate(): boolean {
    return this.validAuth();
  }
  
  canActivateChild(): boolean {
    return this.validAuth();
  }

  private validAuth(): boolean {
    const token = this.authService.getToken();
    if (token) {

      // TODO: Mejorar el tiempo de sesión del usuario

      // const time = Math.floor((new Date().getTime() / 1000));
      // const payload = JSON.parse(atob(token.split('.')[1]));
      // const { exp } = payload;
      // if ( exp > time ) {
        return true;
      // } else {
      //   this.helpers.openInfoAlert('Su sesión ha expirado.').then(() => {
      //     this.authService.closeSession();
      //   });
      //   return false;
      // }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
