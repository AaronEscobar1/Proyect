import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Helpers } from '../../shared/helpers/helpers';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private KEY: string = 'auth';

  constructor(private router: Router,
              private http: HttpService,
              private helpers: Helpers) { }

  authenticateUser(user: User): Observable<any> {
    return this.http.post(this.helpers.getBasicEndPoint('/auth/iniciarSesion'), user);
  }

  getToken(): string | undefined {
    const auth = this.getAuth();
    return auth ? auth.token : undefined;
  }

  setToken(token: string): void {
    const auth = this.getAuth();
    if (auth) {
      auth.token = token;
      this.setAuth(auth);
    }
  }

  getAuth(): any | null {
    const auth = sessionStorage.getItem(this.KEY);
    return auth ? JSON.parse(auth) : null;
  }

  setAuth(data: any): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(data));
  }

  closeSession(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
