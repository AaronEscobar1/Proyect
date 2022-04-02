import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interfaces';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http/http.service';
import { ResponseUser } from '../interfaces/response-user.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private KEY: string = 'auth';

  constructor(private router: Router,
              private http: HttpService) { }

  authenticateUser(user: User): Observable<ResponseUser> {
    return this.http.post(`${environment.api}/auth/iniciarSesion`, user);
  }

  getToken(): string | undefined {
    const auth: ResponseUser = this.getAuth();
    return auth ? auth.tokenDeAcceso : undefined;
  }

  setToken(tokenDeAcceso: string): void {
    const auth: ResponseUser = this.getAuth();
    if (!auth) { 
      return;
    }
    auth.tokenDeAcceso = tokenDeAcceso;
    this.setAuth(auth);
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
