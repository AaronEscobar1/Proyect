import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Helpers } from '../../shared/helpers/helpers';
import { User } from '../interfaces/user.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http/http.service';
import { ResponseUser } from '../interfaces/response-user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private KEY: string = 'auth';

  constructor(private router: Router,
              private http: HttpService,
              private helpers: Helpers) { }

  authenticateUser(user: User): Observable<ResponseUser> {
    return this.http.post(this.helpers.getBasicEndPoint('/auth/iniciarSesion'), user);
  }

  getToken(): string | undefined {
    const auth: ResponseUser = this.getAuth();
    if (auth) {
      return auth.tokenDeAcceso;
    }
    return undefined;
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
