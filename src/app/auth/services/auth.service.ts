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

  getToken(): string | null {
    const auth = this.getAuth();
    if (auth) {
      return auth.token;
    }
    return null;
  }

  setToken(token: string): void {
    const auth = this.getAuth();
    if (auth) {
      auth.token = token;
      this.setAuth(auth);
    }
  }

  getAuth(): any | null {
    const auth = localStorage.getItem(this.KEY);
    return auth ? JSON.parse(auth) : null;
  }

  setAuth(data: any): void {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

  closeSession(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
